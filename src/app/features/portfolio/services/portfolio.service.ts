import { Injectable } from '@angular/core';
import { Portfolio } from '../../../shared/models/portfolio.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private portfolios$ = new BehaviorSubject<Portfolio[]>([]);

  constructor(private http: HttpClient) {}

  loadPortfolios(): void {
    this.http
      .get<Portfolio[]>('/api/portfolios')
      .subscribe(data => this.portfolios$.next(data));
  }

  getPortfolios(): Observable<Portfolio[]> {
    return this.portfolios$.asObservable();
  }
}
