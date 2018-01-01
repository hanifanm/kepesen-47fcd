export class PlateModel {
  public menuId : string;
  public sambal : string;
  public chili : number;
  public toppingId : Array<string>;
  public price : number;
  constructor(){
    this.menuId = '';
    this.sambal = '';
    this.chili = 0;
    this.toppingId = [];
    this.price = 0;
  }
}
