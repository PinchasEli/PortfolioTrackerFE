import { Component } from '@angular/core';
import { Portfolio } from '../../../../shared/models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.scss'
})
export class PortfolioListComponent {
  portfolios$: Observable<Portfolio[]>;

  constructor(private portfolioService: PortfolioService) {
    this.portfolios$ = this.portfolioService.getPortfolios();
  }

  ngOnInit(): void {
    this.portfolioService.loadPortfolios();
  }
}
