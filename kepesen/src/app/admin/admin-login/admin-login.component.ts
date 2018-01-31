import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  username : string;
  password : string;

  constructor(
    private user : UserService
  ) { }

  ngOnInit() {
  }

  onClickLogin() {
    this.user.login(this.username, this.password);
  }

}
