import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  getUserId() : string {
    if (!navigator.cookieEnabled) throw 'Error. Please enable cookie on your browser.';
    let cookies = document.cookie.split('; ');
    let userId = null;
    cookies.forEach(data => {
      let pair = data.split('=');
      if(pair[0]==='userId'){

        userId = pair[1];
      }
    })
    if(userId) return userId;
    else return this.setUserId();
  }

  setUserId() : string {
    let newUserId = (new Date()).getTime().toString() + (Math.floor(Math.random() * (9999 - 1000) + 1000)).toString();
    document.cookie = "userId="+newUserId;
    return newUserId;
  }

}
