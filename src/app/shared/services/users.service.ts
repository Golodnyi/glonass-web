import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { Error } from '../models/error.model';
import { Role } from '../models/role.model';
import { MsgService } from './msg';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {
  private host: string = environment.host;

  constructor(private http: HttpClient,
    private router: Router,
    private msgService: MsgService) {
  }

  public all(): Observable<User[]> {
    return this.http.get(this.host + '/v1/users')
      .map((response: any) => {
        const users: User[] = response;
        const usersObj: User[] = [];
        users.forEach(function (user: User) {
          usersObj.push(Object.assign(new User(), user));
        });
        return usersObj;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public get(id: number): Observable<User> {
    return this.http.get(this.host + '/v1/users/' + id)
      .map((response: any) => {
        return Object.assign(new User(), response);
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public current(): Observable<any> {
    return this.http.get(this.host + '/v1/users/current')
      .map((response: any) => {
        return response;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public role(id: Number): Observable<Role> {
    return this.http.get(this.host + '/v1/roles/' + id)
      .map((response: any) => {
        return Object.assign(new Role(), response);
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public roles(): Observable<Role[]> {
    return this.http.get(this.host + '/v1/roles')
      .map((response: any) => {
        const roles: Role[] = [];
        response.forEach(r => {
          roles.push(Object.assign(new Role(), r));
        });
        return roles;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public create(user: User): Observable<User> {
    return this.http.post(this.host + '/v1/users', user)
      .map((response: any) => {
        return response;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public update(user: User): Observable<User> {
    return this.http.put(this.host + '/v1/users/' + user.id, user)
      .map((response: any) => {
        return response;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }
}
