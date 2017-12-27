import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
@Component({
  selector: 'app-user-navmenu',
  templateUrl: './user-navmenu.component.html',
  styleUrls: ['./user-navmenu.component.css']
})
export class UserNavmenuComponent implements OnInit {

  // menu = [
  //   {
  //     icon : 'glyphicon glyphicon-list-alt',
  //     path : '/user/menu',
  //     label : 'Menu'
  //   },
  //   {
  //     icon : 'glyphicon glyphicon-user',
  //     path : '/user/login',
  //     label : 'Login'
  //   },
  // ]

  constructor(private loginService : LoginService) { }

  ngOnInit() {
  }

  menu = () => {
    if(this.loginService.isLogin){
      return [
        {
          icon : 'glyphicon glyphicon-list-alt',
          path : '/user/menu',
          label : 'Menu'
        },
        {
          icon : 'glyphicon glyphicon-user',
          path : '/user/order',
          label : 'Order'
        },
        {
          icon : 'glyphicon glyphicon-user',
          path : '/user/history',
          label : 'History'
        },
        {
          icon : 'glyphicon glyphicon-user',
          path : '/user/account',
          label : 'Account'
        },
      ]
    } else {
      return [
        {
          icon : 'glyphicon glyphicon-list-alt',
          path : '/user/menu',
          label : 'Menu'
        },
        {
          icon : 'glyphicon glyphicon-user',
          path : '/user/login',
          label : 'Login'
        },
      ]
    }
  }

}
