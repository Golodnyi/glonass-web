import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../models/User';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {env} from "../../env";
import {AuthService} from "./auth.service";

@Injectable()
export class UsersService {
    private usersUrl = '/v1/users';
    private userUrl = '/v1/users/:id';

    constructor (private http: Http, private authService: AuthService) {}

    public getUsers(): Observable<User[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(env.backend + this.usersUrl, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getUser(id): Observable<User> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(env.backend + this.userUrl.replace(':id', id), options)
            .map((response:Response) => {
                if (response.status == 200) {
                    return response.json()
                } else if (response.status == 401)
                {
                    this.authService.logout();
                }
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}
