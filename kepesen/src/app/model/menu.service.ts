import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { BaseService, IBaseService } from '../service/base.service';
import HashMap from 'hashmap';

export class MenuModel {
  public id : string;
  public group : number;
  public name : string;
  public sambal : Array<string>;
  public price : number;
  public price2 : number;
  public active : boolean;
  public ready : boolean;
  public image : string;
  public createdAt : number;
  public createdBy : string;
  public updatedAt : number;
  public updatedBy : string
}

export interface IMenu {
  id : string,
  group : number,
  name : string,
  sambal : Array<string>,
  price : number,
  price2 : number,
  active : boolean,
  ready : boolean,
  image : string,
  createdAt : number,
  createdBy : string,
  updatedAt : number,
  updatedBy : string
}

@Injectable()
export class MenuService extends BaseService<IMenu>
implements IBaseService<IMenu>{

  constructor (
    apiService: ApiService
  ) {
    super('/menu', apiService);
  }

  getMenu(group : number) : MenuModel[] {
    return this.collections.filter((m : MenuModel) => {
      return m.active && m.group === group;
    })
  }

  getOne(id : string) : MenuModel {
    return this.map.get(id);
  }

}
