import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { User } from '../models/user.model';

import { BehaviorSubject, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Auth } from '../../login/shared/models/auth.model';
import { Router } from '@angular/router';
import { MsgService } from './msg';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private host: string = environment.host;
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

    if (auth.remember) {
      // auth.remember = 1;
    }

    return this.http.post(this.host + '/v1/auth/login', auth, options)
      .map((response: Response) => {
        const user: User = Object.assign(new User, response.json());
        this.logger.next(true);
        return user;
      })
      .catch((error: any) => {
        if (error.status === 409) {
          this.logout().subscribe(
            r => {
              if (!r) {
                this.localLogout();
              }
            }
          );
        }
        this.logger.next(false);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public localLogout() {
    localStorage.removeItem('user');
    this.cookieService.remove('token');
    this.setCurrentUser(null);
    this.logger.next(false);
    this.admin.next(false);
    this.router.navigate(['/login']);
  }

  public logout(): Observable<boolean> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.post(
      this.host + '/v1/auth/logout', null, options
    )
      .map(() => {
        this.logger.next(false);
        this.setCurrentUser(null);
        this.admin.next(false);
        return true;
      })
      .catch((error: any) => {
        return Observable.throw(error.json().message || 'Server error');
      });
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
