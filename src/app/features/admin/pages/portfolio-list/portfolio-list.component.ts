import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPortfolio } from '../../models/AdminPortfolio.model';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { Currency } from '../../../../shared/enums/currency.enum';
import { Exchange } from '../../../../shared/enums/exchange.enum';
import { HeaderListComponent } from '../../../../shared/components/header-list/header-list.component';
import { GenericListComponent } from '../../../../shared/components/generic-list/generic-list.component';
import { PaginationControlsComponent } from '../../../../shared/components/pagination-controls/pagination-controls.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs/operators';
import { PaginationParams } from '../../../../shared/models/paginated-response.model';


@Component({
  selector: 'app-admin-portfolio-list',
  standalone: true,
  imports: [
    CommonModule,
    HeaderListComponent,
    GenericListComponent,
    PaginationControlsComponent
  ],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.scss'
})
export class PortfolioListComponent {
  headers: { [key: string]: string } = {
    'ID': 'id',
    'Portfolio Name': 'name',
    'Exchange': 'exchange',
    'Base Currency': 'baseCurrency',
    'Active': 'active',
    'Customer ID': 'customerId',
    'Customer Name': 'customerName',
    'Created At': 'createdAt',
    'Updated At': 'updatedAt'
  };

  loading = signal<boolean>(false);

  // Pagination data
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);

  // Inject services
  private portfolioService = inject(PortfolioService);

  private params$ = toObservable(computed(() => ({
    pageNumber: this.currentPage(),
    pageSize: this.pageSize(),
  })));
  
  private response = toSignal(
    this.params$.pipe(
      tap(() => this.loading.set(true)),
      switchMap((params: PaginationParams) => this.portfolioService.getAllPortfolios(params)),
      tap(() => this.loading.set(false))
    )
  );
  portfolios = computed(() => this.response()?.items ?? []);
  totalCount = computed(() => this.response()?.totalCount ?? 0);
  totalPages = computed(() => this.response()?.totalPages ?? 0);

  displayData = computed(() => this.portfolios().map(portfolio => ({
    ...portfolio,
    exchange: Exchange[portfolio.exchange],
    baseCurrency: Currency[portfolio.baseCurrency],
    active: portfolio.active ? 'Yes' : 'No',
    createdAt: new Date(portfolio.createdAt).toLocaleDateString(),
    updatedAt: new Date(portfolio.updatedAt).toLocaleDateString()
  })));

  onRowSelect(portfolio: AdminPortfolio): void {
    console.log( 'Row selected:', portfolio );
  }

  onActionTrigger(action: string, portfolio: AdminPortfolio): void {
    console.log( 'Action triggered:', action, portfolio );
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize.set(newSize);
    this.currentPage.set(1);
  }

  onNextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(current => current + 1);
    }
  }

  onPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(current => current - 1);
    }
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }
}

