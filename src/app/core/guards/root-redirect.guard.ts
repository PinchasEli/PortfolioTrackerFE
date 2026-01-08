import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../enums/role.enum';


export const rootRedirectGuard: CanActivateFn = (): UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getRole();
  
  if (userRole === Role.Admin || userRole === Role.SuperAdmin) {
    return router.createUrlTree(['/admin']);
  } else if (userRole === Role.Customer) {
    return router.createUrlTree(['/portfolio']);
  } else {
    return router.createUrlTree(['/auth/login']);
  }
};

