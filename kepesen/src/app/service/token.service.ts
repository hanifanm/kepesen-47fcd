import { Injectable } from '@angular/core';
import { IdbService } from './idb.service';

@Injectable()
export class TokenService {

  private token : string;

  constructor(
    private idbService : IdbService
  ) {
    this.token = '';
  }

  getToken = async() => {
    if(this.token) return this.token;
    let tempToken = await this.idbService.get('token');
    this.token = tempToken? tempToken : '';
    return this.token;
  }

  setToken = async(token : string) => {
    await this.idbService.set('token', token);
  }

}
