import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  navItems: NavItem[] = [
    { label: 'Portfolios', route: '/admin/portfolios', icon: '📊' },
    { label: 'Customers', route: '/admin/customers', icon: '👥' }
  ];

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}

