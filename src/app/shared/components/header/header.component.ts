import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private currentUserService = inject(CurrentUserService);

  user$!: Observable<User | null>;

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
