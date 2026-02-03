import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'generic-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericListComponent {
  data = input<any[]>([]);
  headers = input<{ [displayName: string]: string }>({});
  loading = input<boolean>(false);

  rowSelect = output<any>();
  actionTrigger = output<any>();

  headerKeys = computed(() => Object.keys(this.headers()));

  getDataKey(displayName: string): string {
    return this.headers()[displayName];
  }

  onRowSelect(row: any): void {
    this.rowSelect.emit(row);
  }

  onActionTrigger(action: string, row: any): void {
    this.actionTrigger.emit({ action, row });
  }
}
