import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlateModel } from './plate.service';

export const OrderStatus = {
    create : 0,
    order : 1,
    process : 2,
    deliver : 3,
    time_out : 4,
    cancel : 5,
    reject : 6,
    user_not_exist : 7,
    receive : 8
}

export class OrderModel {
    public id : string;
    public costumer_id : string;
    public status : number;
    public list : Array<PlateModel>;
    public rec_address : string;
    public rec_name : string;
    public rec_phone : string
    public rec_location : {
        lat : number,
        lng : number
    }
    constructor(){
        this.id = '';
        this.costumer_id = '';
        this.status = OrderStatus.create,
        this.list = [],
        this.rec_address = '';
        this.rec_location = { lat : 0, lng : 0},
        this.rec_name = '',
        this.rec_phone = '';
    }
}

@Injectable()
export class OrderService {

  private menuUrl = '';
  public collections : OrderModel[];
  public current : OrderModel;
  public newOrder : OrderModel;

  constructor (private http: HttpClient) {
    this.collections = [];
    this.current = null;
    this.newOrder = null;
  }

  fetchData = () => {
  }

  getMenu(group : number) : OrderModel[] {
    return null;
  }

  getOne(id : string) : OrderModel {
    return null;
  }

}
