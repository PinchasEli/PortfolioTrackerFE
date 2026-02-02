import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-list',
  standalone: true,
  imports: [],
  templateUrl: './header-list.component.html',
  styleUrl: './header-list.component.scss'
})
export class HeaderListComponent {
  @Input() title: string = '';
}
