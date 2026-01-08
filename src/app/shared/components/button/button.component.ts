import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }
}
