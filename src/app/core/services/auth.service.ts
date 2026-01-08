import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { Role } from '../enums/role.enum';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = environment.apiBaseUrl;
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_KEY = 'user';
  
    constructor(private http: HttpClient, private router: Router) {}
  
    login(email: string, password: string): Observable<void> {
      console.log(email, password);
      console.log(`${this.apiUrl}/auth/login`);
      return this.http
        .post<{ token: string, user: User }>(
            `${this.apiUrl}/auth/login`, { email, password }
        )
        .pipe(
          tap(res => {
            localStorage.setItem(this.TOKEN_KEY, res.token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
            console.log(res.user);
            this.redirectToDefaultRoute();
          }),
          map(() => void 0)
        );
    }
  
    logout(): void {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
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

    redirectToDefaultRoute(): void {
      const userRole = this.getRole();
      
      console.log('User role:', userRole);

      if (userRole === Role.Admin || userRole === Role.SuperAdmin) {
        console.log('Redirecting to admin');
        this.router.navigate(['/admin']);
      } else if (userRole === Role.Customer) {
        console.log('Redirecting to portfolio');
        this.router.navigate(['/portfolio']);
      } else {
        // null, undefined, or unknown role → login
        console.log('No valid role, redirecting to login');
        this.router.navigate(['/auth/login']);
      }
    }
}