import { Component, OnInit } from '@angular/core';
import { AdminPortfolio } from '../../models/AdminPortfolio.model';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { PaginatedResponse, PaginationParams } from '../../../../shared/models/paginated-response.model';
import { Currency } from '../../../../shared/enums/currency.enum';
import { Exchange } from '../../../../shared/enums/exchange.enum';


@Component({
  selector: 'app-admin-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.scss'
})
export class PortfolioListComponent implements OnInit {
  portfolios: AdminPortfolio[] = [];
  data: any[] = [];
  loading = false;

  // Pagination data
  totalCount = 0;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

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

  constructor(private portfolioService: PortfolioService) {}
  
  ngOnInit(): void {
    this.loadPortfolios();
  }

  private transformPortfoliosForDisplay(portfolios: AdminPortfolio[]): any[] {
    return portfolios.map(portfolio => ({
      ...portfolio,
      exchange: Exchange[portfolio.exchange],
      baseCurrency: Currency[portfolio.baseCurrency],
      active: portfolio.active ? 'Yes' : 'No',
      createdAt: new Date(portfolio.createdAt).toLocaleDateString(),
      updatedAt: new Date(portfolio.updatedAt).toLocaleDateString()
    }));
  }

  loadPortfolios(): void {
    this.loading = true;
    
    const params: PaginationParams = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize
    };
    
    this.portfolioService.getAllPortfolios(params).subscribe({
      next: (response: PaginatedResponse<AdminPortfolio>) => {
        this.portfolios = response.items;
        this.totalCount = response.totalCount;
        this.currentPage = response.pageNumber;
        this.pageSize = response.pageSize;
        this.totalPages = response.totalPages;
        this.loading = false;
        this.data = this.transformPortfoliosForDisplay(response.items);
        console.log(this.data);
      },
      error: (err) => {
        console.error('Failed to load portfolios:', err);
        this.loading = false;
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
    this.pageSize = newSize;
    this.currentPage = 1;
    this.loadPortfolios();
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPortfolios();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPortfolios();
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPortfolios();
  }
}

