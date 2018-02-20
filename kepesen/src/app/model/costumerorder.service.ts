import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PlateModel, IPlate } from './plate.service';
import { ApiService } from '../service/api.service';
import { BaseService, IBaseService } from '../service/base.service';
import * as moment from 'moment';

export const OrderStatus = {
    create : 1,
    order : 2,
    process : 3,
    assigned : 4,
    delivered : 5,
    cancel : 6,
    reject : 7,
    user_not_exist : 8,
    receive : 9,
    time_out : 10
}

export function orderStatusString(order : IOrder){
  switch(order.status){
    case 1 : return 'Menuggu Konfirmasi';
    case 3 : return 'Sedang Dimasak';
    case 4 : return 'Akan Diantar';
    case 5 : return 'Sedang Diantar';
    case 6 : return 'Dibatalkan oleh Costumer';
    case 7 : return 'Ditolak';
    case 8 : return 'Costumer Tidak Ditemukan';
    case 9 : return 'Diterima oleh Costumer';
    case 10 : return 'Waktu Habis';
  }
}

interface Location {
  lat : number,
  lng : number
}

export class OrderModel {
    public id : string = '';
    public status : number = 0;
    public list : Array<IPlate> = [];
    public price : number = 0;
    public recName : string = '';
    public recAddress : string = '';
    public recPhone : string = '';
    public recLocation : Location = { lat : 0, lng : 0 }
    public createdAt : string = ''
    public createdBy : string = '';
    public updatedAt : string = '';
    public updatedBy : string = '';

    constructor(){ }

}

export interface IOrder {
    id : string;
    status : number;
    list : Array<IPlate>;
    price : number;
    recName : string;
    recAddress : string;
    recPhone : string;
    recLocation : Location;
    createdAt : string;
    createdBy : string;
    updatedAt : string;
    updatedBy : string;
}

@Injectable()
export class CostumerOrderService extends BaseService<IOrder> 
implements IBaseService<IOrder>{

  public newOrder : OrderModel;

  constructor (
    apiService: ApiService,
  ) {
    super('/costumerorder', apiService);
    this.newOrder = null;
  }

}
