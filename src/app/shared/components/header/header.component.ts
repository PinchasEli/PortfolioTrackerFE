import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: User | null;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.authService.logout();
  }
}
