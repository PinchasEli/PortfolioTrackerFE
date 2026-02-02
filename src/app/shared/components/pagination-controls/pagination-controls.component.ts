import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pagination-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination-controls.component.html',
  styleUrl: './pagination-controls.component.scss'
})
export class PaginationControlsComponent {
  @Input() totalItems: number = 0;
  @Input() totalCount: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Input() loading: boolean = false;
  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() nextPage: EventEmitter<void> = new EventEmitter<void>();
  @Output() previousPage: EventEmitter<void> = new EventEmitter<void>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  Math = Math;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

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
    this.pageSize = newSize;
    this.pageSizeChanged.emit(newSize);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    const totalPages = this.totalPages;
    
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, this.currentPage - 2);
      const endPage = Math.min(totalPages, this.currentPage + 2);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

}
