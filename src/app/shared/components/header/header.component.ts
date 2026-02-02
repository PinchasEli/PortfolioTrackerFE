import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.currentUserService.getCurrentUser();
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.authService.logout();
  }
}
