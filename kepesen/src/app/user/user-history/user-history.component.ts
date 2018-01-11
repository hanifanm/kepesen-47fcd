import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../model/order.service';
import { CookieService } from '../../service/cookie.service';
import { MenuModel, MenuService } from '../../model/menu.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  isLoading : boolean = false;

  constructor(
    private orderService : OrderService,
    private cookieService : CookieService,
    private menuService : MenuService
  ) {
    try {
      let userId = this.cookieService.getUserId();
      if(orderService.collections.length===0){
        this.isLoading = true;
        orderService.fetchData(userId)
      }
    } catch (err) {
      alert(err);
    }
  }

  ngOnInit() {
  }

  getOrder(order){
    return JSON.stringify(order);
  }

  getMenuDetail(id : string) : MenuModel {
    return this.menuService.getOne(id);
  }

}
