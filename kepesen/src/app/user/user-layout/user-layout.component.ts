import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../model/store.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {

  storeName : string;

  constructor(
    private storeService : StoreService
  ) {
    this.storeName = storeService.getStoreName();
  }

  ngOnInit() {
  }

}
