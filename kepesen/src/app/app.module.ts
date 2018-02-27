import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { routes } from './app.routes';

import { CostumerOrderService } from './model/costumerorder.service';
import { MenuService } from './model/menu.service';
import { OrderService } from './model/order.service';

import { IdbService } from './service/idb.service';
import { BaseService } from './service/base.service';
import { ApiService } from './service/api.service';
import { UserService } from './service/user.service';
import { TokenService } from './service/token.service';
import { AuthGuard } from './service/auth.guard';

import { AppComponent } from './app.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { UserNavmenuComponent } from './user/user-navmenu/user-navmenu.component';
import { UserHistoryComponent } from './user/user-history/user-history.component';
import { UserOrderComponent } from './user/user-order/user-order.component';
import { UserPlateComponent } from './user/user-plate/user-plate.component';
import { SplashscreenComponent } from './user/splashscreen/splashscreen.component';
import { ErrorPanelComponent } from './lib/error-panel/error-panel.component';
import { LoadingComponent } from './lib/loading/loading.component';
import { LoadingOverlayComponent } from './lib/loading-overlay/loading-overlay.component';
import { DialogComponent } from './lib/dialog/dialog.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { TableComponent } from './lib/table/table.component';
import { AdminAccountComponent } from './admin/admin-account/admin-account.component';
import { AdminMenuFormComponent } from './admin/admin-menu-form/admin-menu-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLayoutComponent,
    UserMenuComponent,
    UserNavmenuComponent,
    UserHistoryComponent,
    UserOrderComponent,
    UserPlateComponent,
    SplashscreenComponent,
    ErrorPanelComponent,
    LoadingComponent,
    LoadingOverlayComponent,
    DialogComponent,
    AdminLayoutComponent,
    AdminOrderComponent,
    AdminMenuComponent,
    AdminLoginComponent,
    TableComponent,
    AdminAccountComponent,
    AdminMenuFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbzia7AzPzVx16wBtO7OYrOB3_XDmXulU'
    })
  ],
  providers: [
    MenuService,
    CostumerOrderService,
    OrderService,
    IdbService,
    ApiService,
    BaseService,
    AuthGuard,
    UserService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
