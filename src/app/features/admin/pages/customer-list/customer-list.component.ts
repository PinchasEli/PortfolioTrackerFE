import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../../shared/models/customer.model';
import { CustomerService } from '../../../../core/services/customer.service';
import { PaginationParams } from '../../../../shared/models/paginated-response.model';
import { SortDirection } from '../../../../shared/enums/sort-direction.enum';
import { LoggerService } from '../../../../core/services/logger.service';
import { HeaderListComponent } from '../../../../shared/components/header-list/header-list.component';
import { GenericListComponent } from '../../../../shared/components/generic-list/generic-list.component';
import { PaginationControlsComponent } from '../../../../shared/components/pagination-controls/pagination-controls.component';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { AddCustomerFormComponent } from '../../components/add-customer-form/add-customer-form.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap, combineLatestWith, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    HeaderListComponent,
    GenericListComponent,
    PaginationControlsComponent,
    DialogComponent,
    AddCustomerFormComponent,
    ButtonComponent
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
  error = signal<string>('');
  isDialogOpen = signal<boolean>(false);
  refreshTrigger = signal<number>(0);
  
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

  private refresh$ = toObservable(this.refreshTrigger);

  private response = toSignal(
    this.params$.pipe(
      combineLatestWith(this.refresh$),
      map(([params]) => params),
      tap(() => {
        this.loading.set(true);
        this.error.set('');
      }),
      switchMap((params: PaginationParams) => 
        this.customerService.getCustomers(params).pipe(
          catchError((error) => {
            this.logger.error('Error loading customers:', error);
            this.error.set(error.error?.message || 'Failed to load customers');
            return of({ items: [], totalCount: 0, totalPages: 0, pageNumber: 1, pageSize: 10 });
          })
        )
      ),
      tap(() => this.loading.set(false))
    )
  );
  customers = computed(() => this.response()?.items ?? []);
  totalCount = computed(() => this.response()?.totalCount ?? 0);
  totalPages = computed(() => this.response()?.totalPages ?? 0);

  // computed property for displaying data
  displayData = computed(() => this.customers().map(customer => ({
    ...customer,
    createdAt: new Date(customer.createdAt).toLocaleDateString(),
    updatedAt: new Date(customer.updatedAt).toLocaleDateString()
  })));

  onRowSelect(row: Customer): void {
    this.logger.log('Customer selected:', row);
    // TODO: Implement row selection logic (e.g., navigate to detail page)
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

  openAddCustomerDialog(): void {
    this.isDialogOpen.set(true);
  }

  closeDialog(): void {
    this.isDialogOpen.set(false);
  }

  onCustomerCreated(): void {
    this.closeDialog();
    this.refreshList();
  }

  refreshList(): void {
    // Increment trigger to force a refresh
    this.refreshTrigger.update(v => v + 1);
  }
}
