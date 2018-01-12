import { Component, OnInit } from '@angular/core';
import { IdbService } from '../../service/idb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.css']
})
export class SplashscreenComponent implements OnInit {

  constructor(
    private router : Router,
    private idbService : IdbService
  ) { }

  ngOnInit() {
  }

  onEnterApp = async() => {
    let userId = await this.idbService.getUserId();
    console.log(userId);
    this.router.navigateByUrl('user/menu');
  }
  
}
