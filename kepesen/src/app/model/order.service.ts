import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlateModel } from './plate.service';
import { LoginService } from '../service/login.service';

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
    public driverId : string = '';
    public createdAt : number = 0
    public createdBy : string = '';
    public updatedAt : number = 0;
    public updatedBy : string = '';
    constructor(){ }
}

@Injectable()
export class OrderService {

  private orderUrl = 'https://us-central1-kepesen-47fcd.cloudfunctions.net/rest/api/order';
  public collections : OrderModel[];
  public current : OrderModel;
  public newOrder : OrderModel;

  constructor (
    private http: HttpClient,
    private loginService : LoginService
  ) {
    this.collections = [];
    this.current = null;
    this.newOrder = null;
  }

  fetchData = () => {
    this.collections = [];
    let headers = new HttpHeaders({
      'x-access-token' : this.loginService.token
    });
    // headers.append('x-access-token', this.loginService.token);
    this.http.get(this.orderUrl, {
      headers : headers
    })
    .subscribe((response : any) => {
      response.data.forEach(o => {
        this.collections.push(o);
      });
    })
  }

  post = async (body) => {
    let headers = new HttpHeaders({
      'x-access-token' : this.loginService.token
    });
    this.http.post(
      this.orderUrl, body,{
        headers : headers
      }
    ).subscribe(response => {
      console.log(response);
    })
  }

}
