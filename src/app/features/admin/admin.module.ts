import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { PortfolioListComponent } from './pages/portfolio-list/portfolio-list.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule,
    LayoutComponent,
    AdminSidebarComponent,
    PortfolioListComponent,
    CustomerListComponent
  ]
})
export class AdminModule { }
