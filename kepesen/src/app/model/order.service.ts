import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PlateModel } from './plate.service';

export const OrderStatus = {
    create : 1,
    order : 2,
    process : 3,
    assigned : 4,
    delivered : 5,
    cancel : 6,
    reject : 7,
    user_not_exist : 8,
    receive : 9
}

interface Location {
  lat : number,
  lng : number
}

export class OrderModel {
    public id : string = '';
    public status : number = 0;
    public list : Array<PlateModel> = [];
    public price : number = 0;
    public recName : string = '';
    public recAddress : string = '';
    public recPhone : string = '';
    public recLocation : Location = { lat : 0, lng : 0 }
    public createdAt : number = 0
    public createdBy : string = '';
    public updatedAt : number = 0;
    public updatedBy : string = '';
    constructor(){ }
}

@Injectable()
export class OrderService {

  private orderUrl = 'https://us-central1-kepesen-47fcd.cloudfunctions.net/rest/api/costumerorder';
  public collections : OrderModel[];
  public current : OrderModel;
  public newOrder : OrderModel;
  public isLoading : boolean;

  constructor (
    private http: HttpClient,
  ) {
    this.collections = [];
    this.current = null;
    this.newOrder = null;
    this.isLoading = false;
  }

  fetchData = (userId : string) => {
    this.collections = [];
    let params = new HttpParams();
    this.isLoading = true;
    this.http.get(this.orderUrl + '?userId=' + userId)
    .subscribe((response : any) => {
      response.data.forEach(order => {
        this.collections.push(order);
      });
      this.isLoading = false;
    })
  }

  post = async (body) => {
    this.http.post(this.orderUrl, body)
    .subscribe(response => {
      console.log(response);
    })
  }

}
