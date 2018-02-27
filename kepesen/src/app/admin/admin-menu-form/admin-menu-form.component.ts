import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IMenu, MenuModel, MenuService } from '../../model/menu.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-admin-menu-form',
  templateUrl: './admin-menu-form.component.html',
  styleUrls: ['./admin-menu-form.component.css']
})
export class AdminMenuFormComponent implements OnInit {

  tempSambal : string;
  isError : boolean = false;
  errorMessage : string = '';
  parseInt = parseInt;
  isSubmitDialogShow : boolean = false;

  constructor(
    private menuService: MenuService,
    private user: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    if(!activeRoute.snapshot.paramMap.get('menu_id')) {
      menuService.current = new MenuModel();
      menuService.current.sambal = [];
    }else if(!menuService.current) {
      router.navigateByUrl('admin/menu');
    }
  }

  ngOnInit() {
  }

  onAddSambal = () => {
    if(this.tempSambal==='') return;
    if(!this.menuService.current.sambal) this.menuService.current.sambal = [];
    this.menuService.current.sambal.push(this.tempSambal);
    this.tempSambal = '';
  }

  onDeleteSambal = (sambal : string) => {
    this.menuService.current.sambal = this.menuService.current.sambal.filter(s => {
      return s!=sambal;
    })
  }

  onKeyDown = ($event) => {
    if($event.keyCode === 13) this.onAddSambal();
  }

  onCloseDialog = () => {
    this.isSubmitDialogShow = false;
  }

  onSubmitStart = () => {
    this.errorMessage = '';
    this.isError = false;
    if(!this.menuService.current.image){
      this.errorMessage = 'URL Gambar harus diisi';
    }
    if(!this.menuService.current.price2){
      this.errorMessage = 'Harga Sebagai Topping harus diisi';
    }
    if(!this.menuService.current.price){
      this.errorMessage = 'Harga harus diisi';
    }
    if(!this.menuService.current.group){
      this.errorMessage = 'Grup harus diisi';
    }
    if(!this.menuService.current.name || this.menuService.current.name===''){
      this.errorMessage = 'Nama harus diisi';
    }
    if(this.errorMessage !== '') this.isError = true;
    else this.isSubmitDialogShow = true;
  }

  onSubmitMenu = async () => {
    console.log(this.menuService.current);
    let username = await this.user.getUsername();
    this.isSubmitDialogShow = false;
    this.menuService.current.group = parseInt(this.menuService.current.group.toString());
    this.menuService.current.updatedBy = username;
    
    if(!this.activeRoute.snapshot.paramMap.get('menu_id')){
      this.menuService.current.createdBy = username;
      this.menuService.current.active = false;
      this.menuService.current.ready = false;
      this.menuService.create(this.menuService.current)
      .then(res => {
        this.router.navigateByUrl('admin/menu');
        this.menuService.collections = [];
      }).catch(err => {
        console.log(err);
      })
    } else {
      this.menuService.current.updatedBy = username;
      this.menuService.update(this.menuService.current)
      .then(res => {
        this.router.navigateByUrl('admin/menu');
        this.menuService.collections = [];
      }).catch(err => {
        console.log(err);
      })
    }
  }

}
