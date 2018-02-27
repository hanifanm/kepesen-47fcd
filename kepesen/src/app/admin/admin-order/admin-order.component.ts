import { Component, OnInit } from '@angular/core';
import { OrderStatus, OrderModel, IOrder, orderStatusString } from '../../model/costumerorder.service';
import { OrderService } from '../../model/order.service';
import { ITableProp, IRowAction } from '../../lib/table/table.component';
import { MenuModel, MenuService } from '../../model/menu.service';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  isViewDialogShow : boolean = false;
  isConfirmDialogShow : boolean = false;
  nextStatus : number;

  constructor(
    private orderService : OrderService,
    private menuService: MenuService
  ) {
    this.initModel();
    let order = new OrderModel();
    order.createdAt = '201806012359123';
  }

  ngOnInit() {
  }

  initModel = async() => {
    if (this.menuService.collections.length === 0) {
      try {
        await this.menuService.fetch();
      } catch (err) {
        console.log(err);
      }
    }
    if (this.orderService.collections.length === 0) {
      try {
        await this.orderService.fetch();
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

  getOrderCollections = () => {
    return this.orderService.collections.map(order => {
      return {
        ...order,
        statusString : orderStatusString(order),
        itemLength : order.list.length
      }
    });
  }

  onRefreshTable = async() => {
    await this.orderService.fetch();
  }

  table : ITableProp[]=  [
    { label : 'Nama', key : 'recName' },
    { label : 'Harga', key : 'price' },
    { label : 'Item', key : 'itemLength' },
    { label : 'Status', key : 'statusString' }
  ]

  rowAction : IRowAction[] =[
    { label : 'View', key : 'view' }
  ]

  onActionIncluded = (key : string, data : IOrder) => {
    if(key==='update'){
      if(data.status === OrderStatus.cancel
      || data.status === OrderStatus.time_out
      || data.status === OrderStatus.receive
      || data.status === OrderStatus.user_not_exist
      || data.status === OrderStatus.reject) return false;
    }
    return true;
  }

  onRowAction = (key : string, data : IOrder) => {
    this.orderService.current = data;
    switch(key){
      case 'view':
        this.isViewDialogShow = true;
        break;
    }
  }

  onCloseDialog = () => {
    this.isViewDialogShow = false;
    this.isConfirmDialogShow = false;
  }

  onChangeStatus = (newStatus) => {
    this.nextStatus = newStatus;
    this.isViewDialogShow = false;
    this.isConfirmDialogShow = true;
  }

  onConfirmChangeStatus = () => {
    if(this.nextStatus === 7 &&
    (!this.orderService.current.message || this.orderService.current.message === '')) return;
    this.isConfirmDialogShow = false;
    this.orderService.update({
      updatedBy: 'admin',
      status: this.nextStatus,
      id: this.orderService.current.id,
      message: this.orderService.current.message
    }).then((res: any) => {
      this.onCloseDialog();
      this.orderService.fetch();
    }).catch((err: any) => {
      console.log(err);
    })
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

  getNextStatus = () => {
    if(!this.nextStatus || this.nextStatus===0) return '';
    return orderStatusString({
      ...this.orderService.current,
      status : this.nextStatus
    })
  }

}
