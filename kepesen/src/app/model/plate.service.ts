export class PlateModel {
  public menuId : string = '';
  public sambal : string = '';
  public chili : number = 0;
  public toppingId : Array<string> = [];
  public price : number = 0;
  public quantity : number = 1;
}

export interface IPlate {
  menuId : string;
  sambal : string;
  chili : number;
  toppingId : Array<string>;
  price : number;
  quantity : number;
}
