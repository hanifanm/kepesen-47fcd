import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  constructor() { }

  getStoreLocation = () => {
    return {
      lat : -6.885953080390549,
      lon: 107.61387348175049
    }
  }

  getStoreMaxDist = () => {
    return 1000;
  }

  getStoreName = () => {
    return 'KEGEPREK - CISITU';
  }

  getDeliveryFee = () => {
    return 3000;
  }

}
