import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { HeaderComponent } from './components/header/header.component';
import { GenericListComponent } from './components/generic-list/generic-list.component';
import { HeaderListComponent } from './components/header-list/header-list.component';
import { PaginationControlsComponent } from './components/pagination-controls/pagination-controls.component';


@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    HeaderComponent,
    GenericListComponent,
    HeaderListComponent,
    PaginationControlsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    HeaderComponent,
    GenericListComponent,
    HeaderListComponent,
    PaginationControlsComponent
  ]
})
export class SharedModule { }
