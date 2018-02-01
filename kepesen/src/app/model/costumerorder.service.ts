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

    get createdTime() : string {
      if(this.createdAt==='') return '';
      let year = parseInt(this.createdAt.substring(0, 4));
      let month = parseInt(this.createdAt.substring(4, 6));
      let day = parseInt(this.createdAt.substring(6, 8));
      let hours = parseInt(this.createdAt.substring(8, 10));
      let minutes = parseInt(this.createdAt.substring(10, 12));
      let createdTime = new Date(year, month, day, hours, minutes);
      return moment(createdTime).format('DD/MM/YYYYY HH:mm');
    }

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
