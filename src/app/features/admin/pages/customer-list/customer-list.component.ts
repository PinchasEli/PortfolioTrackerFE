import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../../shared/models/customer.model';
import { CustomerService } from '../../../../core/services/customer.service';
import { PaginationParams } from '../../../../shared/models/paginated-response.model';
import { SortDirection } from '../../../../shared/enums/sort-direction.enum';
import { LoggerService } from '../../../../core/services/logger.service';
import { HeaderListComponent } from '../../../../shared/components/header-list/header-list.component';
import { GenericListComponent } from '../../../../shared/components/generic-list/generic-list.component';
import { PaginationControlsComponent } from '../../../../shared/components/pagination-controls/pagination-controls.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    HeaderListComponent,
    GenericListComponent,
    PaginationControlsComponent
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  headers: { [displayName: string]: string } = {
    'ID': 'id',
    'Name': 'fullName',
    'Email': 'email',
    'Role': 'role',
    'Active': 'active',
    'Created At': 'createdAt',
    'Updated At': 'updatedAt'
  };
  loading = signal<boolean>(false);
  
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);

  // Inject services
  private customerService = inject(CustomerService);
  private logger = inject(LoggerService);

  private params$ = toObservable(computed(() => ({
    pageNumber: this.currentPage(),
    pageSize: this.pageSize(),
    sortBy: 'createdAt',
    sortDirection: SortDirection.Desc,
  })));

  private response = toSignal(
    this.params$.pipe(
      tap(() => this.loading.set(true)),
      switchMap((params: PaginationParams) => this.customerService.getCustomers(params)),
      tap(() => this.loading.set(false))
    )
  );
  customers = computed(() => this.response()?.items ?? []);
  totalCount = computed(() => this.response()?.totalCount ?? 0);
  totalPages = computed(() => this.response()?.totalPages ?? 0);

  // computed property for displaying data
  displayData = computed(() => this.customers().map(customer => ({
    ...customer,
    createdAtString: new Date(customer.createdAt).toLocaleDateString(),
    updatedAtString: new Date(customer.updatedAt).toLocaleDateString()
  })));

  onRowSelect(row: Customer): void {
    console.log(row);
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
