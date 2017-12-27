import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

export class MenuModel {
  constructor(
    public id : string,
    public name : string,
    public price : number,
    public price2 : number,
    public active : boolean,
    public image : string,
    public sambals : [string],
    public group : number,
  ){}
}

@Injectable()
export class MenuService {

  private menuUrl = 'https://us-central1-kepesen-47fcd.cloudfunctions.net/getmenu';
  public collections : MenuModel[];
  public current : MenuModel;

  constructor (private http: HttpClient) {
    this.collections = [];
  }

  fetchData = () => {
    this.collections = [];
    this.http.get(this.menuUrl).subscribe( data => {
      let id = Object.keys(data);
      for(let i=0; i< id.length; i++){
        let menu = data[id[i]];
        menu.id = id[i];
        this.collections.push(menu);
      }
    })
  }

}
