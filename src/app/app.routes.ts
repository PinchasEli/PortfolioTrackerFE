import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { rootRedirectGuard } from './core/guards/root-redirect.guard';
import { Role } from './core/enums/role.enum';

export const routes: Routes = [
    { 
        path: 'auth', 
        loadChildren: () => 
            import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) 
    },
    { 
        path: 'portfolio',
        loadChildren: () => 
            import('./features/portfolio/portfolio.routes').then(m => m.PORTFOLIO_ROUTES),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Role.Customer, Role.Admin, Role.SuperAdmin] }
    },
    { 
        path: 'admin',
        loadChildren: () => 
            import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Role.Admin, Role.SuperAdmin] }
    },
    { 
        path: '', 
        canActivate: [rootRedirectGuard],
        pathMatch: 'full',
        children: [] // Empty route, guard handles redirect via UrlTree
    }
];
