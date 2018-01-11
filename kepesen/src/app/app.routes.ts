import { RouterModule, Routes } from '@angular/router';

import { SplashscreenComponent } from './user/splashscreen/splashscreen.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { UserHistoryComponent } from './user/user-history/user-history.component';
import { UserOrderComponent } from './user/user-order/user-order.component';

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
    }
];
