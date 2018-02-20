import { Component, OnInit } from '@angular/core';
import { IMenu, MenuModel, MenuService } from '../../model/menu.service';
import { UserService } from '../../service/user.service';
import { ITableProp, IRowAction } from '../../lib/table/table.component';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(
    private menuService: MenuService,
    private user: UserService
  ) {
    this.initModel();
  }

  initModel = async () => {
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

  table: ITableProp[] = [
    { label: 'Name', key: 'name' },
    { label: 'Group', key: 'group' },
    { label: 'Price', key: 'price' },
    { label: 'Active', key: 'active' },
    { label: 'Ready', key: 'ready' },
  ]

  rowAction: IRowAction[] = [
    { label: 'Set Ready', key: 'ready' },
    { label: 'Set Habis', key: 'not_ready' },
    { label: 'Aktifkan', key: 'activate' },
    { label: 'Nonaktifkan', key: 'deactivate' }
  ]

  onRowAction = (key: string, data: IMenu) => {
    switch (key) {
      case 'ready':
        this.menuService.current = data;
        this.toggleReadyStatus(data);
        break;
      case 'not_ready':
        this.menuService.current = data;
        this.toggleReadyStatus(data);
        break;
      case 'activate':
        this.menuService.current = data;
        this.toggleActiveStatus(data);
        break;
      case 'deactivate':
        this.menuService.current = data;
        this.toggleActiveStatus(data);
        break;
    }
  }

  toggleReadyStatus = async (data: IMenu) => {
    let username = await this.user.getUsername();
    this.menuService.update({
      updatedBy: username,
      ready: !data.ready,
      active: data.active,
      id: this.menuService.current.id
    }).then((res: any) => {
      this.menuService.fetch();
    }).catch((err: any) => {
      console.log(err);
    })
  }

  toggleActiveStatus = async (data: IMenu) => {
    let username = await this.user.getUsername();
    this.menuService.update({
      updatedBy: username,
      ready: data.ready,
      active: !data.active,
      id: this.menuService.current.id
    }).then((res: any) => {
      this.menuService.fetch();
    }).catch((err: any) => {
      console.log(err);
    })
  }

  onActionIncluded = (key: string, data: IMenu) => {
    if (key === 'ready' && data.ready) return false;
    if (key === 'not_ready' && !data.ready) return false;
    if (key === 'activate' && data.active) return false;
    if (key === 'deactivate' && !data.active) return false;
    return true;
  }

  onRefreshTable = async () => {
    await this.menuService.fetch();
  }

}
