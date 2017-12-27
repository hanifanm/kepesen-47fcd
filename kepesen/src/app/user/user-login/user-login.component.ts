import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  username : string = '';
  password : string = '';

  constructor(private loginService : LoginService) {}

  ngOnInit() {
  }

  onClickLogin(){
    let auth = btoa(this.username + ':' + this.password);
    this.loginService.login(auth);
  }

}
