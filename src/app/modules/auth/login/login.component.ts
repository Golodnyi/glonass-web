import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '../../../models/Auth';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/User';
import { MsgService } from '../../../services/msg';
import { CookieService } from 'angular2-cookie/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  public submit = false;
  public auth: Auth;
  public user: User;
  public form: FormGroup;

  constructor(private router: Router,
              private authService: AuthService,
              private usersService: UsersService,
              private msgService: MsgService,
              private cookieService: CookieService,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [''],
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((data) => {
      this.auth = Object.assign(new Auth(), data);
    });
  }

  onSubmit() {
    this.submit = true;
    this.authService.login(this.auth).subscribe(
      user => {
        this.user = user;
        this.usersService.role(user.role_id).subscribe(
          role => {
            this.user.role = role;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.authService.setCurrentUser(this.user);
            this.router.navigate(['/dashboard']);
            this.submit = false;
          },
          error => {
            this.cookieService.remove('token');
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
            this.submit = false;
          }
        );
      },
      error => {
        this.cookieService.remove('token');
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
        this.submit = false;
      }
    );
  }
}
