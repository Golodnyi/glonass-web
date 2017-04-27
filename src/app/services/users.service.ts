import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { User } from '../models/User';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { env } from '../../env';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Error } from '../models/Error';
import { Role } from '../models/Role';
import { MsgService } from './msg';

@Injectable()
export class UsersService {

  constructor(private http: Http,
              private authService: AuthService,
              private router: Router,
              private msgService: MsgService) {
  }

  public getUsers(): Observable<User[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(env.backend + '/v1/users', options)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public getUser(id: number): Observable<User> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(env.backend + '/v1/users/' + id, options)
      .map((response: Response) => {
        const user: User = Object.assign(new User(), response.json());
        return user;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public getRole(id: Number): Observable<Role> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(env.backend + '/v1/roles/' + id, options)
      .map((response: Response) => {
        const role: Role = Object.assign(new Role(), response.json());
        return role;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public findByName(name: string, users: User[] = null): User[] {
    if (users === null) {
      users = [];
      // TODO: отправка запроса на бэкенд
    }
    const user = users.filter(function (obj) {
      return obj.name.toLowerCase().startsWith(name.toLowerCase());
    });

    return user;
  }
}
