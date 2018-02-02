import { Component, OnInit } from '@angular/core';
import { MenuModel, MenuService } from '../../model/menu.service';
import { ITableProp } from '../../lib/table/table.component';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) {
    this.initModel( );
  }

  initModel = async() => {
    if (this.menuService.collections.length === 0) {
      try {
        await this.menuService.fetch();
      } catch (err) {
        console.log(err);
      }
    }
  }

  ngOnInit() {
  }

  table : ITableProp[]=  [
    { label : 'Name', key : 'name' },
    { label : 'Group', key : 'group' },
    { label : 'Price', key : 'price' },
    { label : 'Active', key : 'active' },
    { label : 'Ready', key : 'ready' },
  ]

  onRefreshTable = async() => {
    await this.menuService.fetch();
  }

}
