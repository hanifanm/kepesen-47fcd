import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor (private http: HttpClient) {
    this.collections = [];
  }

  fetchData = () => {
    this.collections = [];
    this.http.get(this.menuUrl).subscribe((response : any) => {
      response.data.forEach(m => {
        this.collections.push(m);
      });
    })
  }

  getMenu(group : number) : MenuModel[] {
    return this.collections.filter((m : MenuModel) => {
      return m.group === group;
    })
  }

  getOne(id : string) : MenuModel {
    for(let i=0; i<this.collections.length; i++){
      if(id===this.collections[i].id) return this.collections[i];
    }
    return null;
  }

}
