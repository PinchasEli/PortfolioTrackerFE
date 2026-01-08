import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PaginatedResponse, PaginationParams } from '../../shared/models/paginated-response.model';
import { Customer } from '../../shared/models/customer.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly apiUrl = `${environment.apiBaseUrl}/customers`;
  constructor(private http: HttpClient) { }

  getCustomers(params?: PaginationParams): Observable<PaginatedResponse<Customer>> {
    let httpParams = new HttpParams();
    if (params) {
      httpParams = httpParams
        .set('pageNumber', params.pageNumber?.toString() ?? '1')
        .set('pageSize', params.pageSize?.toString() ?? '25');
    }
    return this.http.get<PaginatedResponse<Customer>>(this.apiUrl, { params: httpParams });
  }
}
