import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  label = input<string>('');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  onClick = output<void>();
}
