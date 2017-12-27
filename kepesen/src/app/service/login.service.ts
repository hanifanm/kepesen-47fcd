import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  isLogin : boolean;

  constructor(private router : Router) {
    this.isLogin = false;
  }

  login(auth : string){
    this.isLogin = true;
    this.router.navigateByUrl('/user/menu');
  }

  logout(){
    this.isLogin = false;
    this.router.navigateByUrl('/user/menu');
  }

}
