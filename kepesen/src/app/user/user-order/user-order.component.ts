import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, MenuModel } from '../../model/menu.service';
import { CostumerOrderService, OrderModel, OrderStatus } from '../../model/costumerorder.service';
import { PlateModel } from '../../model/plate.service';
import { IdbService } from '../../service/idb.service';
import geodist from 'geodist';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  newOrder : OrderModel;
  currentPlate : PlateModel;
  currentPlateIndex : number;
  recBenchmark : string = '';
  lat: number;
  lng: number;
  isMapOpen : boolean = false;
  isError : boolean = false;
  errorMessage : string = '';
  isOrderButtonDisabled : boolean = false;
  isDeleteDialogShow : boolean = false;
  isSubmitDialogShow : boolean = false;
  tempPlate : PlateModel;
  storeLocation = {
    lat : -6.880123732861788,
    lon: 107.61204219265983
  }
  maxDist = 2000; //meters
  constructor(
    private orderService : CostumerOrderService,
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
  }

  ngOnInit() {
    this.initNewOrder();
  }

  initNewOrder = async() => {
    let userId = await this.idbService.getUserId();
    this.newOrder.createdBy = userId.toString();
    this.newOrder.updatedBy = userId.toString();
    this.recBenchmark = '';
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

  onAddOrder(){
    this.router.navigateByUrl('user/menu');
  }

  onClickOrder(){
    let error = '';
    let target = {
      lat : this.newOrder.recLocation.lat,
      lon : this.newOrder.recLocation.lng
    }
    let dist = geodist(this.storeLocation, target, {exact : true, unit: 'km'});
    if(dist>this.maxDist/1000){
      error = 'Jarak pengiriman maksimum 2 KM.'
    }
    if(this.newOrder.recLocation.lat === 0){
      error = 'Lokasi Pengiriman harus dipilih.'
    }
    if(this.newOrder.recPhone.length>13 || this.newOrder.recPhone.length<10){
      error = 'Format nomor telpon salah.'
    }
    var reg = /^[0-9]+$/;
    if(!reg.test(this.newOrder.recPhone)){
      error = 'Format nomor telpon salah.'
    }
    if(this.newOrder.recPhone === ''){
      error = 'Nomor Telepon Penerima wajib diisi.'
    }
    if(this.recBenchmark === ''){
      error = "Patokan wajib diisi."
    }
    if(this.newOrder.recAddress === ''){
      error = "Alamat Pengiriman wajib diisi."
    }
    if(this.newOrder.recAddress === ''){
      error = 'Alamat Pengiriman wajib diisi.'
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
      this.isSubmitDialogShow = true;
    }
  }

  onSendOrder = () => {
    this.isOrderButtonDisabled = true;
    this.newOrder.recAddress += '; ' + this.recBenchmark;
    this.orderService.create(this.newOrder)
    .then( (res : any) => {
      this.orderService.newOrder = null;
      this.orderService.collections = [];
      this.router.navigateByUrl('user/history');
    })
    .catch((err : any) => {
      console.log(err);
    })
  }

  onEditPlate = async(plate : PlateModel) => {
    this.currentPlate = new PlateModel();
    this.currentPlateIndex = this.newOrder.list.indexOf(plate);
    Object.assign(this.currentPlate, plate);
    this.currentPlate.toppingId = plate.toppingId.slice();
  }

  onDeletePlateStart = (plate : PlateModel) => {
    this.tempPlate = plate;
    this.isDeleteDialogShow = true;
  }

  onDeletePlate = () => {
    let index = this.newOrder.list.indexOf(this.tempPlate);
    this.newOrder.list.splice(index, 1);
    this.onCloseDialog();
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
  }

  onMapDblClick = ($event) => {
    let target = {
      lat : $event.coords.lat,
      lon : $event.coords.lng
    }
    let dist = geodist(this.storeLocation, target, {exact : true, unit: 'km'});
    if(dist>this.maxDist/1000) return;
    this.newOrder.recLocation.lat = $event.coords.lat;
    this.newOrder.recLocation.lng = $event.coords.lng;
  }

  onToggleMap = () => {
    if(this.newOrder.recLocation.lat===0){
      this.lat = this.storeLocation.lat;
      this.lng = this.storeLocation.lon;
    } else {
      this.lat = this.newOrder.recLocation.lat;
      this.lng = this.newOrder.recLocation.lng;
    }
    this.isMapOpen = !this.isMapOpen;
  }

  onCloseDialog = () => {
    this.isDeleteDialogShow = false;
    this.isSubmitDialogShow = false;
  }

  isOrderValid = () => {
    if(this.getTotalPrice()>10000) return true;
    return false;
  }

}
