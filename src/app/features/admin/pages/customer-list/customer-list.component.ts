import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Customer } from '../../../../shared/models/customer.model';
import { CustomerService } from '../../../../core/services/customer.service';
import { PaginationParams } from '../../../../shared/models/paginated-response.model';
import { SortDirection } from '../../../../shared/enums/sort-direction.enum';
import { LoggerService } from '../../../../core/services/logger.service';
import { PaginatedResponse } from '../../../../shared/models/paginated-response.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  customers = signal<Customer[]>([]);

  totalCount = signal<number>(0);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalPages = signal<number>(1);
  loading = signal<boolean>(false);
  headers: { [displayName: string]: string } = {
    'ID': 'id',
    'Name': 'fullName',
    'Email': 'email',
    'Role': 'role',
    'Active': 'active',
    'Created At': 'createdAt',
    'Updated At': 'updatedAt'
  };
  
  // Computed params - automatically updates when currentPage or pageSize changes
  params = computed<PaginationParams>(() => ({
    pageNumber: this.currentPage(),
    pageSize: this.pageSize(),
    sortBy: 'createdAt',
    sortDirection: SortDirection.Desc,
  }));

  // computed property for displaying data
  displayData = computed(() => this.customers().map(customer => ({
    ...customer,
    createdAtString: new Date(customer.createdAt).toLocaleDateString(),
    updatedAtString: new Date(customer.updatedAt).toLocaleDateString()
  })));

  // Inject services
  private customerService = inject(CustomerService);
  private logger = inject(LoggerService);

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading.set(true);

    this.customerService.getCustomers(this.params()).subscribe({
      next: (response: PaginatedResponse<Customer>) => {
        this.customers.set(response.items);
        this.totalCount.set(response.totalCount);
        this.pageSize.set(response.pageSize);
        this.currentPage.set(response.pageNumber);
        // No need to manually update params - computed handles it automatically!
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (error: any) => {
        this.loading.set(false);
        this.logger.error('Error loading customers:', error);
      }
    });
  }

  onRowSelect(row: Customer): void {
    console.log(row);
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize.set(newSize);
    this.currentPage.set(1);
    this.loadCustomers();
  }

  onNextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.loadCustomers();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.loadCustomers();
    }
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadCustomers();
  }
}
