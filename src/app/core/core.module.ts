import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RoleGuard } from './guards/role.guard';



@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    RoleGuard
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
