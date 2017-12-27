import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(private loginService : LoginService) {}

  ngOnInit() {
  }

  onClickLogout(){
    this.loginService.logout();
  }

}
