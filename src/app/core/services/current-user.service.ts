import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private readonly USER_KEY = 'user';
  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private logger: LoggerService) {
    this.logger.log('Initializing current user from storage');
    this.initializeFromStorage();
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  private initializeFromStorage(): void {
    const userJson = localStorage.getItem(this.USER_KEY);
    const user = userJson ? JSON.parse(userJson) : null;
    this.currentUser$.next(user);
  }

  updateCurrentUser(user: User | null): void {
    this.currentUser$.next(user);

    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.USER_KEY);
    }
  }
}
