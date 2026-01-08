import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { rootRedirectGuard } from './core/guards/root-redirect.guard';
import { Role } from './core/enums/role.enum';

export const routes: Routes = [
    { 
        path: 'auth', 
        loadChildren: () => 
            import('./features/auth/auth.module').then(m => m.AuthModule) 
    },
    { 
        path: 'portfolio',
        loadChildren: () => 
            import('./features/portfolio/portfolio.module').then(m => m.PortfolioModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Role.Customer, Role.Admin, Role.SuperAdmin] }
    },
    { 
        path: 'admin',
        loadChildren: () => 
            import('./features/admin/admin.module').then(m => m.AdminModule),
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
