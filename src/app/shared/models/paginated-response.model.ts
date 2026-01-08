import { SortDirection } from "../enums/sort-direction.enum";

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}


export interface PaginationParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
  searchTerm?: string;
}

