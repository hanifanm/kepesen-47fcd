import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {

  username : string;

  constructor(
    private user : UserService
  ) { }

  ngOnInit() {
    this.username = '';
    this.user.getUsername().then(username => {
      this.username = username;
    }).catch(err => {
      console.log(err);
    })
  }

}
