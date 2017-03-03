import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/User";
import {Auth} from "../../../models/Auth";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  private usr: User;
  public auth: Auth;

  constructor(private authService: AuthService) {
    this.auth = {email: 'demo@demo.ru', password: 'demo', remember: 0};
  }

  ngOnInit() {

  }

  login() {
    this.authService.login(this.auth).subscribe(data => {
      this.usr = data;
    });
  }

}
