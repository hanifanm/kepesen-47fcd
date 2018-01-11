import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../service/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.css']
})
export class SplashscreenComponent implements OnInit {

  constructor(
    private cookieService : CookieService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  onEnterApp(){
    try {
      this.cookieService.getUserId();
      this.router.navigateByUrl('user/menu');
    } catch (err) {
      alert(err);
    }
  }

}
