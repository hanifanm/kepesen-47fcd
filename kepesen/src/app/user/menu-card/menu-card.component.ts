import { Component, OnInit, Input } from '@angular/core';
import { MenuModel } from '../../model/menu.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {

  @Input() menu : MenuModel;
  @Input() onOrder : any;

  constructor() { }

  ngOnInit() {
  }

}
