import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  private loginUrl = 'https://us-central1-kepesen-47fcd.cloudfunctions.net/rest/api/authenticate';
  public isLogin : boolean;
  public user : any = null;
  public token : string = null;

  constructor(
    private router : Router,
    private http : HttpClient
  ) {
    console.log('token', this.getFromCookie('x-access-token'));
    console.log('user', JSON.parse(this.getFromCookie('user')));
    if(this.getFromCookie('x-access-token')===null){
      this.isLogin = false;
      this.user = null;
      this.token = null;
    } else {
      this.isLogin = true;
      this.user = JSON.parse(this.getFromCookie('user'));
      this.token = this.getFromCookie('x-access-token');
    }
  }

  login(auth : string){
    this.http.post(this.loginUrl, {
      auth : auth
    }).subscribe((response : any) => {
      console.log(response);
      if(response.success){
        this.setCookie('x-access-token', response['x-access-token']);
        this.setCookie('user', JSON.stringify(response.data));
        this.isLogin = true;
        this.user = response.data;
        this.token = response['x-access-token'];
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
