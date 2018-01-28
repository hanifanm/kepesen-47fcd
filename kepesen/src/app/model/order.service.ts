import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { BaseService, IBaseService } from '../service/base.service';
import { OrderStatus, OrderModel, IOrder } from './costumerorder.service';

@Injectable()
export class OrderService extends BaseService<IOrder> 
implements IBaseService<IOrder> {

  constructor (
    apiService: ApiService,
  ) {
    super('/order', apiService);
  }

}
