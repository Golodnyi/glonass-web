import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../models/User';

import {Observable, BehaviorSubject} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {env} from "../../env";
import {Auth} from "../models/Auth";
import {CookieService} from 'angular2-cookie/core';
import {UsersService} from "./users.service";

@Injectable()
export class AuthService {
    private loginUrl = '/v1/auth/login';

    private logger: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private admin: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private http: Http, private cookieService: CookieService) {
        this.isLoggedIn();
    }

    public login(auth: Auth): Observable<User> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({headers: headers, withCredentials: true});

        var remember = 0;
        if (auth.remember) {
            remember = 1;
        }

        return this.http.post(env.backend + this.loginUrl, 'email=' + auth.email + '&password=' + auth.password + '&remember=' + remember, options)
            .map((response: Response) => {
                this.logger.next(true);
                return response.json();
            })
            .catch((error: any) => {
                this.logger.next(false);
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    public logout() {
        localStorage.removeItem('user');
        this.cookieService.remove('token');
        this.logger.next(false);
    }

    public isLoggedIn(): Observable<boolean> {
        if (localStorage.getItem('user') !== undefined && this.cookieService.get('token') !== undefined) {
            this.logger.next(true);
        }
        else {
            this.logout();
        }

        return this.logger.asObservable();
    }

    public isAdmin(): Observable<boolean> {
        var user: User = JSON.parse(localStorage.getItem('user'));

        if (
            localStorage.getItem('user') !== undefined &&
            this.cookieService.get('token') !== undefined &&
            user.role.is_global
        ) {
            this.admin.next(true);
        }

        return this.admin.asObservable();
    }
}
