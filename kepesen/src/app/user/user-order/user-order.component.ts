import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, MenuModel } from '../../model/menu.service';
import { OrderService, OrderModel, OrderStatus } from '../../model/order.service';
import { PlateModel } from '../../model/plate.service';
import { IdbService } from '../../service/idb.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  newOrder : OrderModel;
  currentPlate : PlateModel;
  currentPlateIndex : number;
  lat: number;
  lng: number;
  isMapOpen : boolean = false;
  isError : boolean = false;
  errorMessage : string = '';
  constructor(
    private orderService : OrderService,
    private menuService : MenuService,
    private idbService : IdbService,
    private router : Router
  ) {
    if (this.orderService.newOrder !== null){
      this.newOrder = orderService.newOrder;
    } else {
      this.newOrder = new OrderModel();
    }
    this.currentPlate = null;
    if(this.newOrder.recLocation.lat===0){
      this.lat = -6.880123732861788;
      this.lng = 107.61204219265983;
    } else {
      this.lat = this.newOrder.recLocation.lat;
      this.lng = this.newOrder.recLocation.lng;
    }
  }

  ngOnInit() {
    this.initNewOrder();
  }

  initNewOrder = async() => {
    let userId = await this.idbService.getUserId();
    console.log(userId);
    this.newOrder.createdBy = userId.toString();
    this.newOrder.updatedBy = userId.toString();
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
    if(this.newOrder.recLocation.lat === 0){
      error = 'Lokasi Pengiriman harus dipilih.'
    }
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
      // alert(error);
      this.isError = true;
      this.errorMessage = error;
      return;
    } else {
      this.isError = false;
      this.errorMessage = '';
    }
    this.orderService.post(this.newOrder)
    .then( (res : any) => {
      this.router.navigateByUrl('user/history');
    })
    .catch((err : any) => {
      console.log(err);
    })
  }

  onEditPlate = async(plate : PlateModel) => {
    await new Promise(resolve => setTimeout(resolve, 100));
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

  onDragEnd = ($event) => {
    this.newOrder.recLocation.lat = $event.coords.lat;
    this.newOrder.recLocation.lng = $event.coords.lng;
    console.log(this.newOrder.recLocation);
  }

  onToggleMap = () => {
    this.isMapOpen = !this.isMapOpen;
  }

}
