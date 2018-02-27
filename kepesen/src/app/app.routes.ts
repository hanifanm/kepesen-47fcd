import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { SplashscreenComponent } from './user/splashscreen/splashscreen.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { UserHistoryComponent } from './user/user-history/user-history.component';
import { UserOrderComponent } from './user/user-order/user-order.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AdminMenuFormComponent } from './admin/admin-menu-form/admin-menu-form.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminAccountComponent } from './admin/admin-account/admin-account.component';

export const routes : Routes = [
    { 
        path: '',
        component: SplashscreenComponent,
        pathMatch: 'full'
    },
    {
        path: 'user',
        component: UserLayoutComponent,
        children: [
            {
                path: 'menu',
                component: UserMenuComponent,
                pathMatch: 'full'
            },
            {
                path: 'order',
                component: UserOrderComponent,
                pathMatch: 'full'
            },
            {
                path: 'history',
                component: UserHistoryComponent,
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'admin/login',
        component: AdminLoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/admin/order',
                pathMatch: 'full'
            },
            {
                path: 'menu',
                component: AdminMenuComponent,
                pathMatch: 'full'
            },
            {
                path: 'menu/create',
                component: AdminMenuFormComponent,
                pathMatch: 'full'
            },
            {
                path: 'menu/:menu_id/edit',
                component: AdminMenuFormComponent,
                pathMatch: 'full'
            },
            {
                path: 'order',
                component: AdminOrderComponent,
                pathMatch: 'full'
            },
            {
                path: 'account',
                component: AdminAccountComponent,
                pathMatch: 'full'
            }
        ]
    }
];
