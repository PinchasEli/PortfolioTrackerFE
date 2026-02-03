import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pagination-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination-controls.component.html',
  styleUrl: './pagination-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationControlsComponent {
  Math = Math;

  totalItems = input<number>(0);
  totalCount = input<number>(0);
  pageSize = input<number>(10);
  currentPage = input<number>(1);
  loading = input<boolean>(false);
  
  pageSizeChanged = output<number>();
  nextPage = output<void>();
  previousPage = output<void>();
  pageChanged = output<number>();

  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  nextPageFn(): void {
    this.nextPage.emit();
  }

  previousPageFn(): void {
    this.previousPage.emit();
  }

  goToPage(page: number): void {
    this.pageChanged.emit(page);
  }

  changePageSize(newSize: number): void {
    this.pageSizeChanged.emit(newSize);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    const totalPages = this.totalPages();
    
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } 
    else {
      const startPage = Math.max(1, this.currentPage() - 2);
      const endPage = Math.min(totalPages, this.currentPage() + 2);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

}
