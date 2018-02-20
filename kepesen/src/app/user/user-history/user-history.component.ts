import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CostumerOrderService, OrderStatus, OrderModel, orderStatusString } from '../../model/costumerorder.service';
import { IdbService } from '../../service/idb.service';
import { MenuModel, MenuService } from '../../model/menu.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  JSON: any = JSON;
  isViewDialogShow: boolean = false;
  isCancelDialogShow: boolean = false;

  constructor(
    private orderService: CostumerOrderService,
    private idbService: IdbService,
    private menuService: MenuService
  ) {
    this.initModel();
  }

  initModel = async () => {
    let userId = await this.idbService.getUserId();
    let userIdString = userId.toString();
    if (this.menuService.collections.length === 0) {
      try {
        await this.menuService.fetch();
      } catch (err) {
        console.log(err);
      }
    }
    if (this.orderService.collections.length === 0) {
      try {
        let params = new HttpParams().set('userId', userIdString);
        await this.orderService.fetch(params);
      } catch (err) {
        console.log(err);
      }
    }
    for(let i=0; i<this.orderService.collections.length; i++){
      let order = this.orderService.collections[i];
      if(order.status!==OrderStatus.create) continue;
      let now = moment.utc().add(7, 'hours').format('YYYYMMDDHHmmssSSS');
      if(this.getMinuteDif(now, order.createdAt) > 15) order.status = OrderStatus.time_out;
    }
  }

  isLoading() {
    return this.orderService.isLoading || this.menuService.isLoading;
  }

  ngOnInit() {
  }

  isHistoryEmpty(): boolean {
    return !this.isLoading() && this.orderService.collections.length === 0
  }

  onCloseDialog = () => {
    this.isViewDialogShow = false;
    this.isCancelDialogShow = false;
  }

  onCancelOrderStart = (order : OrderModel) => {
    this.orderService.current = order;
    this.isCancelDialogShow = true;
  }

  onCancelOrder = async (order: OrderModel) => {
    let userId = await this.idbService.getUserId();
    this.orderService.update({
      updatedBy: userId.toString(),
      status: OrderStatus.cancel,
      id: this.orderService.current.id
    }).then((res: any) => {
      let params = new HttpParams().set('userId', userId.toString());
      this.orderService.fetch(params);
    }).catch((err: any) => {
      console.log(err);
    })
    this.onCloseDialog();
  }

  onViewOrder = (order: OrderModel) => {
    this.orderService.current = order;
    this.isViewDialogShow = true;
    console.log(order);
  }

  getMinuteDif(time1 : string, time2 : string){
    if(time1.substring(0,8)!==time2.substring(0,8)) return 9999;
    let h1 = parseInt(time1.substring(8, 10));
    let m1 = parseInt(time1.substring(10, 12));
    let h2 = parseInt(time2.substring(8, 10));
    let m2 = parseInt(time2.substring(10, 12));
    let diff = (h1-h2)*60 + m1 - m2;
    return diff;
  }

  getDate = (stringDate : string) : string=> {
    if(stringDate==='') return '';
    let year = parseInt(stringDate.substring(0, 4));
    let month = parseInt(stringDate.substring(4, 6))-1;
    let day = parseInt(stringDate.substring(6, 8));
    let hours = parseInt(stringDate.substring(8, 10));
    let minutes = parseInt(stringDate.substring(10, 12));
    let createdTime = new Date(year, month, day, hours, minutes);
    return moment(createdTime).format('DD/MM/YYYY HH:mm');
  }

  getStatusString = (order : OrderModel) => {
    return orderStatusString(order);
  }

  getStatusColor = (order : OrderModel) => {
    if(order.status === OrderStatus.cancel
    || order.status === OrderStatus.reject
    || order.status === OrderStatus.user_not_exist
    || order.status === OrderStatus.time_out) return 'rgba(255, 0, 0, 0.1)';
    if(order.status === OrderStatus.receive) return 'rgba(0, 255, 0, 0.1)'
  }

}
