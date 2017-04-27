import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '../../../models/Auth';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/User';
import { MsgService } from '../../../services/msg';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  public disabled = false;
  public auth: Auth;
  public user: User;

  constructor(private router: Router,
              private authService: AuthService,
              private usersService: UsersService,
              private msgService: MsgService,
              private cookieService: CookieService) {
    this.auth = {email: 'demo@demo.ru', password: 'demo', remember: false};
  }

  ngOnInit() {

  }

  login(event: any) {
    this.disabled = true;
    this.authService.login(this.auth).subscribe(
      user => {
        this.user = user;
        this.usersService.getRole(user.role_id).subscribe(
          role => {
            this.user.role = role;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.authService.setCurrentUser(this.user);
            this.router.navigate(['/dashboard']);
            this.disabled = false;
          },
          error => {
            this.cookieService.remove('token');
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
            this.disabled = false;
          }
        );
      },
      error => {
        this.cookieService.remove('token');
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
        this.disabled = false;
      }
    );
  }
}
