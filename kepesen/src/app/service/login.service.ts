import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  private menuUrl = 'https://us-central1-kepesen-47fcd.cloudfunctions.net/rest/api/authenticate';
  public isLogin : boolean;
  public user : any = null;

  constructor(
    private router : Router,
    private http : HttpClient
  ) {
    console.log('cookie', document.cookie.split('; '));
    console.log('token', this.getFromCookie('x-access-token'));
    console.log('user', this.getFromCookie('user'));
    if(this.getFromCookie('x-access-token')===null){
      this.isLogin = false;
      this.user = null;
    } else {
      this.isLogin = true;
      this.user = JSON.parse(this.getFromCookie('user'));
    }
  }

  login(auth : string){
    this.http.post(this.menuUrl, {
      auth : auth
    }).subscribe((data : any) => {
      if(data.status){
        this.setCookie('x-access-token', data['x-access-token']);
        this.setCookie('user', JSON.stringify(data.data));
        this.isLogin = true;
        this.user = data.data;
        this.router.navigateByUrl('/user/menu');
      }
    });
  }

  logout(){
    this.setCookie('x-access-token', '');
    this.setCookie('user', '');
    this.isLogin = false;
    this.user = null;
    this.router.navigateByUrl('/user/menu');
  }

  setCookie(key:string, value: string){
    document.cookie = key + '=' + value;
  }

  getFromCookie(key: string){
    let cookie = document.cookie.split('; ');
    for(let i=0; i<cookie.length; i++){
      var x = cookie[i].split('=');
      if(x[0]===key){
        return x[1] ? x[1] : null;
      }
    }
    return null;
  }

}
