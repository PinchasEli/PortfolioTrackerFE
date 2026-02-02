import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'generic-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.scss'
})
export class GenericListComponent {
  @Input() data: any[] = [];
  @Input() headers: { [displayName: string]: string } = {};
  @Input() loading: boolean = false;

  @Output() rowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() actionTrigger: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  get headerKeys(): string[] {
    return Object.keys(this.headers);
  }

  getDataKey(displayName: string): string {
    return this.headers[displayName];
  }

  onRowSelect(row: any): void {
    this.rowSelect.emit(row);
  }

  onActionTrigger(action: string, row: any): void {
    this.actionTrigger.emit({ action, row });
  }
}
