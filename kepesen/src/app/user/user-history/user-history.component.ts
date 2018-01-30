import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CostumerOrderService, OrderStatus, OrderModel } from '../../model/costumerorder.service';
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

  getStatus = (st : number, createdAt : string) => {
    switch(st){
      case 1 : 
        let now = moment.utc().add(7, 'hours').format('YYYYMMDDHHmmssSSS')
        if(this.getMinuteDif(now, createdAt) < 15) return 'Menuggu konfirmasi.';
        else return 'Waktu Habis, pesanan dibatalkan secara otomatis.'
      case 3 : return 'Pesanan sedang diproses.';
      case 4 : return 'Pesanan akan dikirimkan.';
      case 5 : return 'Pesanan sedang dikirmkan.';
      case 6 : return 'Pesanan dibatalkan oleh pembeli.';
      case 7 : return 'Pesanan ditolak.';
      case 8 : return 'Pemesan tidak ditemukan di lokasi.';
      case 9 : return 'Pesanan diterima pembeli.';
    }
  }

}
