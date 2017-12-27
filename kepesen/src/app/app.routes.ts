import { RouterModule, Routes } from '@angular/router';

import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserAccountComponent } from './user/user-account/user-account.component';
import { UserHistoryComponent } from './user/user-history/user-history.component';
import { UserOrderComponent } from './user/user-order/user-order.component';

export const routes : Routes = [
    { 
        path: '',
        redirectTo: 'user/menu',
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
                path: 'login',
                component: UserLoginComponent,
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
            },
            {
                path: 'account',
                component: UserAccountComponent,
                pathMatch: 'full'
            },
        ]
    }
];
