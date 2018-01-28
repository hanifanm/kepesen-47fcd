import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  menus = [
    {
      label : "MENU",
      path: '/admin/menu'
    },
    {
      label : "ORDER",
      path: '/admin/order'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
