import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, MenuModel } from '../../model/menu.service';
import { OrderService, OrderModel, OrderStatus } from '../../model/order.service';
import { PlateModel } from '../../model/plate.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  private isPlateShown : boolean = false;
  public currentPlate : PlateModel;

  constructor(
    private menuService : MenuService,
    private orderService : OrderService,
    private router : Router
  ) {
    this.isPlateShown = false;
  }

  ngOnInit() {
    if(this.menuService.collections.length===0){
      this.menuService.fetchData();
    }
  }

  getMenu(group : number) : MenuModel[] {
    return this.menuService.getMenu(group);
  }

  onOrder = async(menu : MenuModel) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    this.currentPlate = new PlateModel();
    this.currentPlate.menuId = menu.id;
    this.menuService.current = menu;
    this.isPlateShown = true;
  }

  onPlateOrder = (plate : PlateModel) => {
    if(this.orderService.newOrder === null){
      this.orderService.newOrder = new OrderModel();
    }
    this.orderService.newOrder.list.push(plate);
    this.router.navigateByUrl('user/order');
  }

  onPlateCancel = () => {
    this.isPlateShown = false;
  }

}
