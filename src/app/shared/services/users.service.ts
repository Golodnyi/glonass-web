
import { catchError, map } from 'rxjs/operators';

import { throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


import { Role } from '../models/role.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable()
export class UsersService {
    private host: string = environment.host;

    constructor(private http: HttpClient, private errorService: ErrorService) {}

    public all(): Observable<User[]> {
        return this.http.get(this.host + '/v1/users').pipe(
            map((response: any) => {
                const users: User[]    = response;
                const usersObj: User[] = [];
                users.forEach(function (user: User) {
                    usersObj.push(Object.assign(new User(), user));
                });
                return usersObj;
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }

    public get(id: number): Observable<User> {
        return this.http.get(this.host + '/v1/users/' + id).pipe(
            map((response: any) => {
                return Object.assign(new User(), response);
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }

    public current(): Observable<any> {
        return this.http.get(this.host + '/v1/users/current').pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }

    public role(id: Number): Observable<Role> {
        return this.http.get(this.host + '/v1/roles/' + id).pipe(
            map((response: any) => {
                return Object.assign(new Role(), response);
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }

    public roles(): Observable<Role[]> {
        return this.http.get(this.host + '/v1/roles').pipe(
            map((response: any) => {
                const roles: Role[] = [];
                response.forEach(r => {
                    roles.push(Object.assign(new Role(), r));
                });
                return roles;
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }

    public create(user: User): Observable<User> {
        return this.http.post(this.host + '/v1/users', user).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }

    public update(user: User): Observable<User> {
        return this.http.put(this.host + '/v1/users/' + user.id, user).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }
}
