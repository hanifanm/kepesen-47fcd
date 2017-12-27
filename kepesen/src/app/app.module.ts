import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';

import { MenuService } from './model/menu.service';
import { LoginService } from './service/login.service';

import { AppComponent } from './app.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { UserNavmenuComponent } from './user/user-navmenu/user-navmenu.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { MenuCardComponent } from './user/menu-card/menu-card.component';
import { UserAccountComponent } from './user/user-account/user-account.component';
import { UserHistoryComponent } from './user/user-history/user-history.component';
import { UserOrderComponent } from './user/user-order/user-order.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLayoutComponent,
    UserMenuComponent,
    UserNavmenuComponent,
    UserLoginComponent,
    MenuCardComponent,
    UserAccountComponent,
    UserHistoryComponent,
    UserOrderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MenuService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
