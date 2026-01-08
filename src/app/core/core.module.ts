import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleGuard } from './guards/role.guard';

@NgModule({
  declarations: [],
  providers: [
    RoleGuard
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
