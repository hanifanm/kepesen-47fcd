import { Component, OnInit } from '@angular/core';
import { OrderService, OrderStatus, OrderModel } from '../../model/costumerorder.service';
import { IdbService } from '../../service/idb.service';
import { MenuModel, MenuService } from '../../model/menu.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  JSON : any = JSON;
  isViewDialogShow : boolean = false;

  constructor(
    private orderService: OrderService,
    private idbService: IdbService,
    private menuService: MenuService
  ) {
    this.initModel();
  }

  initModel = async () => {
    let userId = await this.idbService.getUserId();
    let userIdString = userId.toString();
    if (this.orderService.collections.length === 0) {
      try {
        let params = new HttpParams().set('userId', userIdString);
        await this.orderService.fetch(params);
      } catch (err) {
        console.log(err);
      }
    }
  }

  ngOnInit() {
  }

  isHistoryEmpty(): boolean {
    return !this.orderService.isLoading && this.orderService.collections.length === 0
  }

  onCloseDialog = () => {
    this.isViewDialogShow = false;
  }

  onCancelOrder = async (order: OrderModel) => {
    let userId = await this.idbService.getUserId();
    this.orderService.update({
      updatedBy: userId.toString(),
      status: OrderStatus.cancel,
      id: order.id
    }).then((res: any) => {
      let params = new HttpParams().set('userId', userId.toString());
      this.orderService.fetch(params);
    }).catch((err: any) => {
      console.log(err);
    })
  }

  onViewOrder = (order: OrderModel) => {
    this.orderService.current = order;
    this.isViewDialogShow = true;
  }

}
