import { Component, OnInit } from '@angular/core';
import { MenuService, MenuModel } from '../../model/menu.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  constructor(private menuService : MenuService) { }

  ngOnInit() {
    if(this.menuService.collections.length===0){
      this.menuService.fetchData();
    }
  }

  menuGroup(group) : MenuModel[] {
    return this.menuService.collections.filter((m : MenuModel) => {
      return m.group === group;
    })
  }

  onOrder(menu : MenuModel) {
    alert(JSON.stringify(menu));
  }

}
