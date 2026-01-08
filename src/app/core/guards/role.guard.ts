import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as Role[];
    const userRole = this.authService.getRole();
    if (userRole !== null && userRole !== undefined && allowedRoles.includes(userRole)) {
        return true;
    }
    
    return false;
  }
}