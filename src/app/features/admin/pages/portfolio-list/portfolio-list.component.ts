import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPortfolio } from '../../models/AdminPortfolio.model';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { PaginatedResponse, PaginationParams } from '../../../../shared/models/paginated-response.model';
import { Currency } from '../../../../shared/enums/currency.enum';
import { Exchange } from '../../../../shared/enums/exchange.enum';
import { HeaderListComponent } from '../../../../shared/components/header-list/header-list.component';
import { GenericListComponent } from '../../../../shared/components/generic-list/generic-list.component';
import { PaginationControlsComponent } from '../../../../shared/components/pagination-controls/pagination-controls.component';


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
export class PortfolioListComponent implements OnInit {
  portfolios = signal<AdminPortfolio[]>([]);
  loading = signal<boolean>(false);

  // Pagination data
  totalCount = signal<number>(0);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);

  totalPages = signal<number>(0);

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

  displayData = computed(() => this.portfolios().map(portfolio => ({
    ...portfolio,
    exchange: Exchange[portfolio.exchange],
    baseCurrency: Currency[portfolio.baseCurrency],
    active: portfolio.active ? 'Yes' : 'No',
    createdAt: new Date(portfolio.createdAt).toLocaleDateString(),
    updatedAt: new Date(portfolio.updatedAt).toLocaleDateString()
  })));

  private portfolioService = inject(PortfolioService);
  // constructor(private portfolioService: PortfolioService) {} OLD VERSION
  
  ngOnInit(): void {
    this.loadPortfolios();
  }

  // OLD VERSION
  // private transformPortfoliosForDisplay(portfolios: AdminPortfolio[]): any[] {
  //   return portfolios.map(portfolio => ({
  //     ...portfolio,
  //     exchange: Exchange[portfolio.exchange],
  //     baseCurrency: Currency[portfolio.baseCurrency],
  //     active: portfolio.active ? 'Yes' : 'No',
  //     createdAt: new Date(portfolio.createdAt).toLocaleDateString(),
  //     updatedAt: new Date(portfolio.updatedAt).toLocaleDateString()
  //   }));
  // }

  loadPortfolios(): void {
    this.loading.set(true);
    
    const params: PaginationParams = {
      pageNumber: this.currentPage(),
      pageSize: this.pageSize()
    };
    
    this.portfolioService.getAllPortfolios(params).subscribe({
      next: (response: PaginatedResponse<AdminPortfolio>) => {
        this.portfolios.set(response.items);
        this.totalCount.set(response.totalCount);
        this.currentPage.set(response.pageNumber);
        this.pageSize.set(response.pageSize);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load portfolios:', err);
        this.loading.set(false);
      }
    });
  }

  onRowSelect(portfolio: AdminPortfolio): void {
    console.log( 'Row selected:', portfolio );
  }

  onActionTrigger(action: string, portfolio: AdminPortfolio): void {
    console.log( 'Action triggered:', action, portfolio );
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize.set(newSize);
    this.currentPage.set(1);
    this.loadPortfolios();
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage.set(this.currentPage() + 1);
      this.loadPortfolios();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.loadPortfolios();
    }
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadPortfolios();
  }
}

