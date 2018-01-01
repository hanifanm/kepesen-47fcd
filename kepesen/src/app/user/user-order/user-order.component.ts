import { Component, OnInit } from '@angular/core';
import { MenuService, MenuModel } from '../../model/menu.service';
import { OrderService, OrderModel, OrderStatus } from '../../model/order.service';
import { PlateModel } from '../../model/plate.service';
@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  private newOrder : OrderModel = new OrderModel();
  private currentPlate : PlateModel;
  private currentPlateIndex : number;

  constructor(
    private orderService : OrderService,
    private menuService : MenuService,
  ) {
    if(this.orderService.newOrder !== null){
      this.newOrder = orderService.newOrder;
    }
    this.currentPlate = null;
  }

  ngOnInit() {
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
    if(this.newOrder.rec_phone === ''){
      error = 'Nomor Telepon Penerima wajib diisi.'
    }
    if(this.newOrder.rec_address === ''){
      error = 'Lokasi Pengiriman wajib diisi.'
    }
    if(this.newOrder.rec_name === ''){
      error = 'Nama Penerima wajib diisi.'
    }
    if(this.newOrder.list.length === 0){
      error = 'Pesanan minimal adalah 1. Silakan pilih dari daftar menu.'
    }
    if(error.length > 0 ){
      alert(error);
      return;
    }
    alert(JSON.stringify(this.newOrder));
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
