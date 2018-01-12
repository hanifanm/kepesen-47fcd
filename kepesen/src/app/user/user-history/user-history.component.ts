import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../model/order.service';
import { IdbService } from '../../service/idb.service';
import { MenuModel, MenuService } from '../../model/menu.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  // isLoading : boolean = false;

  constructor(
    private orderService : OrderService,
    private idbService : IdbService,
    private menuService : MenuService
  ) {
    this.initModel();
  }

  initModel = async() => {
    let userId = await this.idbService.getUserId();
    // this.isLoading = true;
    try {
      await this.orderService.fetchData(userId.toString());
    } catch(err){
      console.log(err);
    }
    // this.isLoading = false;
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
