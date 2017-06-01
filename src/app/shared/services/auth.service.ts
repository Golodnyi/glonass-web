import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { User } from '../models/user.model';

import { BehaviorSubject, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { env } from '../../../env';
import { Auth } from '../../auth/shared/models/auth.model';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { MsgService } from './msg';

@Injectable()
export class AuthService {
  private user: BehaviorSubject<User> = new BehaviorSubject(null);
  private logger: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private admin: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: Http,
              private cookieService: CookieService,
              private router: Router,
              private msg: MsgService) {
    this.isLoggedIn();
  }

  public login(auth: Auth): Observable<User> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    let remember = 0;
    if (auth.remember) {
      remember = 1;
    }

    return this.http.post(
      env.backend + '/v1/auth/login',
      'email=' + auth.email
      + '&password=' + auth.password
      + '&remember=' + remember, options
    )
      .map((response: Response) => {
        const user: User = Object.assign(new User, response.json());
        this.logger.next(true);
        return user;
      })
      .catch((error: any) => {
        this.logger.next(false);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public logout() {
    localStorage.removeItem('user');
    this.cookieService.removeAll();
    this.setCurrentUser(null);
    this.logger.next(false);
    this.admin.next(false);
    this.router.navigate(['/login']);
  }

  private setStateAuth(): void {
    const state = this.logger.getValue();

    if (localStorage.getItem('user') !== null && this.cookieService.get('token') !== undefined) {
      this.setCurrentUser(Object.assign(new User(), JSON.parse(localStorage.getItem('user'))));
      this.logger.next(true);
    } else {
      this.logger.next(false);

      if (state !== false) {
        this.msg.notice(MsgService.ERROR, 'Ошибка', 'Необходима авторизация');
        this.logout();
      }
    }
  }

  public isLoggedIn(): Observable<boolean> {
    this.setStateAuth();
    return this.logger.asObservable();
  }

  public isAdmin(): Observable<boolean> {
    this.setStateAuth();

    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user === null) {
      this.logout();
    }

    if (user.role.is_global && this.logger.getValue()) {
      this.admin.next(true);
    } else {
      this.admin.next(false);
    }
    return this.admin.asObservable();
  }

  public setCurrentUser(user: User): void {
    this.user.next(user);
  }

  public getCurrentUser(): Observable<User> {
    return this.user.asObservable();
  }
}
