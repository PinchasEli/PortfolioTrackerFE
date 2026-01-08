import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { Role } from '../enums/role.enum';
import { LoggerService } from './logger.service';
import { CurrentUserService } from './current-user.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = environment.apiBaseUrl;
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_KEY = 'user';
  
    constructor(
        private http: HttpClient, 
        private router: Router,
        private currentUserService: CurrentUserService,
        private logger: LoggerService
    ) {}
  
    login(email: string, password: string): Observable<void> {
      this.logger.debug('Login attempt', { email });
      this.logger.debug('API URL:', `${this.apiUrl}/auth/login`);
      return this.http
        .post<{ token: string, user: User }>(
            `${this.apiUrl}/auth/login`, { email, password }
        )
        .pipe(
          tap(res => {
            localStorage.setItem(this.TOKEN_KEY, res.token);
            // updateCurrentUser will handle localStorage for user
            this.currentUserService.updateCurrentUser(res.user);
            this.logger.log('User logged in successfully', res.user);
            // Redirect after successful login
            this.redirectToDefaultRoute();
          }),
          map(() => void 0)
        );
    }
  
    logout(): void {
      localStorage.removeItem(this.TOKEN_KEY);
      // updateCurrentUser(null) will handle removing USER_KEY from localStorage
      this.currentUserService.updateCurrentUser(null);
      this.router.navigate(['/auth/login']);
    }

    getToken(): string | null {
      return localStorage.getItem(this.TOKEN_KEY);
    }

    getUser(): User | null {
      return localStorage.getItem(this.USER_KEY) ? JSON.parse(localStorage.getItem(this.USER_KEY)!) : null;
    }

    isAuthenticated(): boolean {
      return !!localStorage.getItem(this.TOKEN_KEY);
    }

    getRole(): Role | null {
      const user = this.getUser();
      return user?.role ?? null;
    }

    private redirectToDefaultRoute(): void {
      const userRole = this.getRole();
      
      this.logger.debug('User role:', userRole);

      if (userRole === Role.Admin || userRole === Role.SuperAdmin) {
        this.logger.debug('Redirecting to admin');
        this.router.navigate(['/admin']);
      } else if (userRole === Role.Customer) {
        this.logger.debug('Redirecting to portfolio');
        this.router.navigate(['/portfolio']);
      } else {
        // null, undefined, or unknown role → login
        this.logger.warn('No valid role, redirecting to login');
        this.router.navigate(['/auth/login']);
      }
    }
}