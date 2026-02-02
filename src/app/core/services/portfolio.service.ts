import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Portfolio } from '../../shared/models/portfolio.model';
import { AdminPortfolio } from '../../features/admin/models/AdminPortfolio.model';
import { PaginatedResponse, PaginationParams } from '../../shared/models/paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly apiUrl = `${environment.apiBaseUrl}/portfolios`;
  private readonly adminApiUrl = `${environment.BOapiBaseUrl}/portfolios`;
  

  constructor(private http: HttpClient) {}

  getMyPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.apiUrl}/my`);
  }

  getPortfolioById(id: string): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.apiUrl}/${id}`);
  }

  createPortfolio(portfolio: Partial<Portfolio>): Observable<Portfolio> {
    return this.http.post<Portfolio>(this.apiUrl, portfolio);
  }

  updatePortfolio(id: string, portfolio: Partial<Portfolio>): Observable<Portfolio> {
    return this.http.put<Portfolio>(`${this.apiUrl}/${id}`, portfolio);
  }

  deletePortfolio(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Admin Methods (for admin feature)
  getAllPortfolios(params?: PaginationParams): Observable<PaginatedResponse<AdminPortfolio>> {
    let httpParams = new HttpParams();
    
    if (params) {
      httpParams = httpParams
        .set('pageNumber', params.pageNumber?.toString() ?? '1')
        .set('pageSize', params.pageSize?.toString() ?? '25');
      
      if (params.sortBy) {
        httpParams = httpParams.set('sortBy', params.sortBy);
      }
      if (params.sortDirection) {
        httpParams = httpParams.set('sortDirection', params.sortDirection);
      }
      if (params.searchTerm) {
        httpParams = httpParams.set('searchTerm', params.searchTerm);
      }
    }
    
    return this.http.get<PaginatedResponse<AdminPortfolio>>(this.adminApiUrl, { params: httpParams });
  }
}
