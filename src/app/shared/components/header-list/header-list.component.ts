import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'header-list',
  standalone: true,
  imports: [],
  templateUrl: './header-list.component.html',
  styleUrl: './header-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderListComponent {
  title = input<string>('');
}
