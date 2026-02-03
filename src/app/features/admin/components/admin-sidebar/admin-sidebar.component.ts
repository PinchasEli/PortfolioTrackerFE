import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSidebarComponent {
  private router = inject(Router);

  navItems: NavItem[] = [
    { label: 'Portfolios', route: '/admin/portfolios', icon: '📊' },
    { label: 'Customers', route: '/admin/customers', icon: '👥' }
  ];

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}

