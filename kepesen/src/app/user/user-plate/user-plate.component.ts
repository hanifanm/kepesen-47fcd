import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';

import { MenuService, MenuModel } from '../../model/menu.service';
import { OrderService, OrderModel } from '../../model/costumerorder.service';
import { PlateModel } from '../../model/plate.service';

@Component({
  selector: 'app-user-plate',
  templateUrl: './user-plate.component.html',
  styleUrls: ['./user-plate.component.css'],
  animations: [
    trigger('plateState', [
      state('inactive', style({
        top: '100vh'
      })),
      state('active',   style({
        top: '0'
      })),
      transition(':enter', [
        style({
          top: '100vh'
        }),
        animate('300ms ease-in', style({
          top: '0'
        }))
      ]),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class UserPlateComponent implements OnInit {

  @Input() onPlateOrder : any;
  @Input() onPlateCancel : any;
  @Input() currentPlate : PlateModel;
  
  private currentMenu : MenuModel;
  private toppingList : MenuModel[];
  private isAskSambal : boolean = false;
  private isAskTopping : boolean = false;
  private isError : boolean = false;
  private errorMessage : string = '';
  private animationState : string;

  constructor(
    private menuService : MenuService
  ) {
  }

  ngOnInit() {
    this.currentMenu = this.menuService.getOne(this.currentPlate.menuId);
    this.toppingList = this.menuService.getMenu(2);
    if(this.currentMenu.sambal && this.currentMenu.sambal.length>0)
      this.isAskSambal = true;
    if(this.currentMenu.group===1) this.isAskTopping = true;
    this.animationState = 'active';
  }

  onChiliUp() {
    if(this.currentPlate.chili===10) return;
    this.currentPlate.chili++;
  }

  onChiliDown() {
    if(this.currentPlate.chili===0) return;
    this.currentPlate.chili--;
  }

  isToppingAdded(topping : MenuModel){
    return this.currentPlate.toppingId.indexOf(topping.id) >= 0;
  }

  onToggleTopping(topping : MenuModel){
    let index = this.currentPlate.toppingId.indexOf(topping.id);
    if(index>=0){
      this.currentPlate.toppingId.splice(index, 1);
    } else {
      this.currentPlate.toppingId.push(topping.id);
    }
  }

  getPrice() : number {
    var price : number = this.currentMenu.price;
    this.currentPlate.toppingId.forEach( toppingId => {
      price += this.menuService.getOne(toppingId).price2;
    })
    this.currentPlate.price = price;
    return price;
  }

  onClickOrder = async(plate : PlateModel) => {
    if(this.isAskSambal && this.currentPlate.sambal === ''){
      // alert('Pilihan sambal harus diisi.');
      this.isError = true;
      this.errorMessage = 'Pilihan sambal harus diisi.';
      return;
    } else {
      this.isError = false;
    }
    this.animationState = 'inactive';
    await new Promise(resolve => setTimeout(resolve, 400));
    this.onPlateOrder(plate);
  }

  onClickCancel = async() => {
    this.animationState = 'inactive';
    await new Promise(resolve => setTimeout(resolve, 400));
    this.onPlateCancel();
  }

}
