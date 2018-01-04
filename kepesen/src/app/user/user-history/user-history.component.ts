import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../model/order.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  constructor(
    private orderService : OrderService
  ) {
    orderService.fetchData();
  }

  ngOnInit() {
  }

  getOrder(order){
    return JSON.stringify(order);
  }

}
