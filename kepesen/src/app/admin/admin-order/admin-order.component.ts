import { Component, OnInit } from '@angular/core';
import { OrderStatus, OrderModel, IOrder } from '../../model/costumerorder.service';
import { OrderService } from '../../model/order.service';
import { ITableProp, IRowAction } from '../../lib/table/table.component';
import { MenuModel, MenuService } from '../../model/menu.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  isViewDialogShow : boolean = false;

  constructor(
    private orderService : OrderService,
    private menuService: MenuService
  ) {
    this.initModel();
    let order = new OrderModel();
    order.createdAt = '201806012359123';
    console.log(order.createdTime);
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
  }

  onRefreshTable = async() => {
    await this.orderService.fetch();
  }

  table : ITableProp[]=  [
    { label : 'Name', key : 'recName' },
    { label : 'Price', key : 'price' },
    { label : 'Status', key : 'status' }
  ]

  rowAction : IRowAction[] =[
    { label : 'View', key : 'view' },
    { label : 'UpdateStatus', key : 'update' }
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
    switch(key){
      case 'view':
        this.orderService.current = data;
        this.isViewDialogShow = true;
        break;
    }
  }

  onCloseDialog = () => {
    this.isViewDialogShow = false;
  }

  onChangeStatus = (newStatus) => {
    this.orderService.update({
      updatedBy: 'admin',
      status: newStatus,
      id: this.orderService.current.id
    }).then((res: any) => {
      this.onCloseDialog();
      this.orderService.fetch();
    }).catch((err: any) => {
      console.log(err);
    })
  }

}
