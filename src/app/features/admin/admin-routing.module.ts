import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { PortfolioListComponent } from './pages/portfolio-list/portfolio-list.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
