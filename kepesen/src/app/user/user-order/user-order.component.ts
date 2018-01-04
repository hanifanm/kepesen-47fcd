import { Component, OnInit } from '@angular/core';
import { MenuService, MenuModel } from '../../model/menu.service';
import { OrderService, OrderModel, OrderStatus } from '../../model/order.service';
import { PlateModel } from '../../model/plate.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  private newOrder : OrderModel;
  private currentPlate : PlateModel;
  private currentPlateIndex : number;

  constructor(
    private orderService : OrderService,
    private menuService : MenuService,
    private loginService : LoginService
  ) {
    if (this.orderService.newOrder !== null){
      this.newOrder = orderService.newOrder;
    } else {
      this.newOrder = new OrderModel();
    }
    this.currentPlate = null;
  }

  ngOnInit() {
    this.initNewOrder();
  }

  initNewOrder(){
    this.newOrder.createdBy = this.loginService.user.username;
    this.newOrder.updatedBy = this.loginService.user.username;
  }

  getMenuDetail(id : string) : MenuModel {
    return this.menuService.getOne(id);
  }

  getTotalPrice() : number {
    let totalPrice = 0;
    this.newOrder.list.forEach((p)=>{
      totalPrice += p.price;
    })
    return totalPrice;
  }

  onSendOrder(){
    let error = '';
    if(this.newOrder.recPhone === ''){
      error = 'Nomor Telepon Penerima wajib diisi.'
    }
    if(this.newOrder.recAddress === ''){
      error = 'Lokasi Pengiriman wajib diisi.'
    }
    if(this.newOrder.recName === ''){
      error = 'Nama Penerima wajib diisi.'
    }
    if(this.newOrder.list.length === 0){
      error = 'Pesanan minimal adalah 1. Silakan pilih dari daftar menu.'
    }
    if(error.length > 0 ){
      alert(error);
      return;
    }
    this.orderService.post(this.newOrder);
  }

  onEditPlate(plate : PlateModel){
    this.currentPlate = new PlateModel();
    this.currentPlateIndex = this.newOrder.list.indexOf(plate);
    Object.assign(this.currentPlate, plate);
    this.currentPlate.toppingId = plate.toppingId.slice();
  }

  isPlateShown() : boolean {
    return this.currentPlate!==null;
  }

  onPlateOrder = (plate : PlateModel) => {
    this.newOrder.list[this.currentPlateIndex] = plate;
    this.currentPlate = null;
  }

  onPlateCancel = () => {
    this.currentPlate = null;
  }

}
