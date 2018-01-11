import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import HashMap from 'hashmap';

export class MenuModel {
  constructor(
    public id : string,
    public group : number,
    public name : string,
    public sambal : [string],
    public price : number,
    public price2 : number,
    public active : boolean,
    public ready : boolean,
    public image : string,
    public createdAt : number,
    public createdBy : string,
    public updatedAt : number,
    public updatedBy : string
  ){}
}

@Injectable()
export class MenuService {

  private menuUrl = 'https://us-central1-kepesen-47fcd.cloudfunctions.net/rest/api/menu';
  public collections : MenuModel[];
  public current : MenuModel;
  private map : any;
  private isLoading : boolean;

  constructor (private http: HttpClient) {
    this.collections = [];
    this.map = new HashMap();
    this.isLoading = false;
  }

  fetchData = () => {
    this.collections = [];
    this.map = new HashMap();
    this.isLoading = true;
    this.http.get(this.menuUrl).subscribe((response : any) => {
      response.data.forEach(m => {
        this.collections.push(m);
        this.map.set(m.id, m);
      });
      this.isLoading = false;
    })
  }

  getMenu(group : number) : MenuModel[] {
    return this.collections.filter((m : MenuModel) => {
      return m.group === group;
    })
  }

  getOne(id : string) : MenuModel {
    return this.map.get(id);
  }

}
