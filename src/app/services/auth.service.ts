import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../models/User';

import {Observable, Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {env} from "../../env";
import {Auth} from "../models/Auth";

@Injectable()
export class AuthService {
    private loginUrl = '/v1/auth/login';

    private logger = new Subject<boolean>();

    constructor(private http: Http) {
    }

    public login(auth: Auth): Observable<User> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(env.backend + this.loginUrl, 'email=' + auth.email + '&password=' + auth.password + '&remember=' + auth.remember, options)
            .map((response: Response) => {
                localStorage.setItem('user', JSON.stringify(response.json()));
                this.logger.next(true);
                return response.json();
            })
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    public logout()
    {
        localStorage.removeItem('user');
        this.logger.next(false);
    }

    isLoggedIn(): Observable<boolean> {
        return this.logger.asObservable();
    }
}
