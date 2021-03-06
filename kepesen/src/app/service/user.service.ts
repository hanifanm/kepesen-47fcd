import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { IdbService } from './idb.service';

@Injectable()
export class UserService {

  private username: string;
  errorMessage : string;
  isLoading : boolean;

  constructor(
    private http : HttpClient,
    private router : Router,
    private apiService: ApiService,
    private tokenService : TokenService,
    private idbService : IdbService
  ) {
    this.errorMessage = null;
  }

  getUsername = async() => {
    if(this.username) return this.username;
    this.username = await this.idbService.get('username');
    return this.username;
  }

  isUserLoggedIn = () => {
    this.tokenService.getToken().then(token => {
      if(!token || token===''){
        this.router.navigateByUrl('/admin/login');
      }
    })
    return true; //temporary true
  }

  login = async(username, password) => {
    this.errorMessage = null;
    this.isLoading = true;
    this.apiService.post('/authenticate', {
      auth : btoa(username + ':' + password)
    }).then((data : any) => {
      this.isLoading = false;
      let token = data['x-access-token'];
      this.tokenService.setToken(token);
      this.idbService.set('username', username);
      this.router.navigateByUrl('/admin/order');
    }).catch((error : any) => {
      this.isLoading = false;
      this.errorMessage = error.error.message;
    })
  }

  logout = async() => {
    await this.idbService.set('username', '');
    await this.tokenService.setToken('');
    this.router.navigateByUrl('/admin/login');
  }

}
