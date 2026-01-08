import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../../shared/models/customer.model';
import { CustomerService } from '../../../../core/services/customer.service';
import { PaginationParams } from '../../../../shared/models/paginated-response.model';
import { Role } from '../../../../core/enums/role.enum';
import { SortDirection } from '../../../../shared/enums/sort-direction.enum';
import { LoggerService } from '../../../../core/services/logger.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  loading: boolean = false;
  headers: { [displayName: string]: string } = {
    'ID': 'id',
    'Name': 'fullName',
    'Email': 'email',
    'Role': 'role',
    'Active': 'active',
    'Created At': 'createdAt',
    'Updated At': 'updatedAt'
  };
  params: PaginationParams = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: SortDirection.Desc
  };
  
  constructor(
    private customerService: CustomerService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getCustomers(this.params).subscribe((customers) => {
      this.customers = customers.items?.map(
        (customer: Customer) => ({
            ...customer,
            createdAtString: new Date(customer.createdAt).toLocaleDateString(),
            updatedAtString: new Date(customer.updatedAt).toLocaleDateString()
        }) 
      ) ?? [];
      this.totalCount = customers.totalCount ?? 0;
      this.pageSize = customers.pageSize ?? 10;
      this.currentPage = customers.pageNumber ?? 1;
      this.params.pageSize = this.pageSize;
      this.params.pageNumber = this.currentPage;
      this.totalPages = customers.totalPages ?? 1;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.logger.error('Error loading customers:', error);
    });
  }

  onRowSelect(row: Customer): void {
    console.log(row);
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.currentPage = 1;
    this.params.pageSize = newSize;
    this.params.pageNumber = 1;
    this.loadCustomers();
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.params.pageNumber = this.currentPage;
      this.loadCustomers();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.params.pageNumber = this.currentPage;
      this.loadCustomers();
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.params.pageNumber = page;
    this.loadCustomers();
  }
}
