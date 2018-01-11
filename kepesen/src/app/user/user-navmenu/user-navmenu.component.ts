import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-user-navmenu',
  templateUrl: './user-navmenu.component.html',
  styleUrls: ['./user-navmenu.component.css']
})
export class UserNavmenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  menu = () => {
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
        }
      ]
  }

}
