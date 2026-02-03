import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { PortfolioService } from '../../../../core/services/portfolio.service';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioListComponent {
  private portfolioService = inject(PortfolioService);

  // Declarative signal-based data fetching
  portfolios = toSignal(this.portfolioService.getMyPortfolios(), { initialValue: [] });
}
