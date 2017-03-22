import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../models/User';

import {Observable, BehaviorSubject} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {env} from "../../env";
import {Auth} from "../models/Auth";
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class AuthService {
    private loginUrl = '/v1/auth/login';

    private logger: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private http: Http, private cookieService:CookieService) {
        this.logger.next(false);
        if (localStorage.getItem('user') && this.cookieService.get('token')) {
            this.logger.next(true);
        }
    }

    public login(auth: Auth): Observable<User> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(env.backend + this.loginUrl, 'email=' + auth.email + '&password=' + auth.password + '&remember=' + auth.remember, options)
            .map((response: Response) => {
                if (response.status == 200) {
                    localStorage.setItem('user', JSON.stringify(response.json()));
                    this.logger.next(true);
                    return response.json();
                }

                this.logger.next(false);

            })
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    public logout() {
        localStorage.removeItem('user');
        this.logger.next(false);
        this.cookieService.remove('token');
    }

    public isLoggedIn(): Observable<boolean> {
        return this.logger.asObservable();
    }
}
