import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu, MenuModel, MenuService } from '../../model/menu.service';
import { UserService } from '../../service/user.service';
import { ITableProp, IRowAction } from '../../lib/table/table.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  isDeleteDialogShow : boolean = false;

  constructor(
    private menuService: MenuService,
    private user: UserService,
    private router: Router
  ) {
    this.initModel();
  }

  initModel = async () => {
    if (this.menuService.collections.length === 0) {
      try {
        await this.menuService.fetch();
        this.menuService.collections.sort((a, b) => {
          return a.group-b.group
        })
      } catch (err) {
        console.log(err);
      }
    }
  }

  ngOnInit() {
  }

  table: ITableProp[] = [
    { label: 'Nama', key: 'name' },
    { label: 'Grup', key: 'group' },
    { label: 'Harga', key: 'price' },
    { label: 'Aktif', key: 'active' },
    { label: 'Tersedia', key: 'ready' },
  ]

  rowAction: IRowAction[] = [
    { label: 'Set Ready', key: 'ready' },
    { label: 'Set Habis', key: 'not_ready' },
    { label: 'Aktifkan', key: 'activate' },
    { label: 'Nonaktifkan', key: 'deactivate' },
    { label: 'Edit', key: 'edit' },
    { label: 'Delete', key: 'delete' }
  ]

  onRowAction = (key: string, data: IMenu) => {
    this.menuService.current = data;
    switch (key) {
      case 'ready':
        this.toggleReadyStatus(data);
        break;
      case 'not_ready':
        this.toggleReadyStatus(data);
        break;
      case 'activate':
        this.toggleActiveStatus(data);
        break;
      case 'deactivate':
        this.toggleActiveStatus(data);
        break;
      case 'edit':
        this.router.navigateByUrl(`admin/menu/${data.id}/edit`);
        break;
      case 'delete':
        this.isDeleteDialogShow = true;
        break;
    }
  }

  toggleReadyStatus = async (data: IMenu) => {
    let username = await this.user.getUsername();
    data.ready = !data.ready;
    data.updatedBy = username;
    this.menuService.update(data)
    .then((res: any) => {
      this.menuService.fetch();
    }).catch((err: any) => {
      console.log(err);
    })
  }

  toggleActiveStatus = async (data: IMenu) => {
    let username = await this.user.getUsername();
    data.active = !data.active;
    data.updatedBy = username;
    this.menuService.update(data)
    .then((res: any) => {
      this.menuService.fetch();
    }).catch((err: any) => {
      console.log(err);
    })
  }

  onDeleteMenu = async () => {
    this.onCloseDialog();
    let params = new HttpParams().set('id', this.menuService.current.id);
    await this.menuService.remove(params);
    this.menuService.collections = [];
    this.initModel();
  }

  onActionIncluded = (key: string, data: IMenu) => {
    if (key === 'ready' && data.ready) return false;
    if (key === 'not_ready' && !data.ready) return false;
    if (key === 'activate' && data.active) return false;
    if (key === 'deactivate' && !data.active) return false;
    return true;
  }

  onRefreshTable = () => {
    this.menuService.collections = [];
    this.initModel();
  }

  onCreate = () => {
    this.menuService.current = null;
    this.router.navigateByUrl('admin/menu/create');
  }

  onCloseDialog = () => {
    this.isDeleteDialogShow = false;
  }

}
