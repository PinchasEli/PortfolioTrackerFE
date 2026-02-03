import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { PortfolioListComponent } from './pages/portfolio-list/portfolio-list.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'portfolios', pathMatch: 'full' },
      { path: 'portfolios', component: PortfolioListComponent },
      { path: 'customers', component: CustomerListComponent }
    ]
  }
];
