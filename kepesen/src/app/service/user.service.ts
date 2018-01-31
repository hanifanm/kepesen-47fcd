import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { IdbService } from './idb.service';

@Injectable()
export class UserService {

  private token : string;
  errorMessage : string;
  isLoading : boolean;

  constructor(
    private http : HttpClient,
    private router : Router,
    private apiService: ApiService,
    private idbService: IdbService
  ) {
    this.errorMessage = null;
  }

  getToken = async() => {
    if(this.token) return this.token;
    this.token = await this.idbService.get('token');
    if(!this.token) this.router.navigateByUrl('/admin/login');
    return this.token;
  }

  isUserLoggedIn = () => {
    if(this.token && this.token !=='') return true;
    this.getToken();
    return true; //temporary true
  }

  login = async(username, password) => {
    this.errorMessage = null;
    this.isLoading = true;
    this.apiService.post('/authenticate', {
      auth : btoa(username + ':' + password)
    }).subscribe(
      (data : any) => {
        this.isLoading = false;
        this.token = data['x-access-token'];
        this.idbService.set('token', this.token);
        this.router.navigateByUrl('/admin/order');
      },
      (error : any) => {
        this.isLoading = false;
        this.errorMessage = error.error.message;
      }
    )
  }

}
