import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../models/User';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService {
    private usersUrl = 'http://localhost:9090/v1/users';
    private userUrl = 'http://localhost:9090/v1/users/:id';

    constructor (private http: Http) {}

    public getUsers(): Observable<User[]> {
        return this.http.get(this.usersUrl)
            .map((res:Response) => res.json().response)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getUser(id): Observable<User> {
        return this.http.get(this.userUrl.replace(':id', id))
            .map((res:Response) => res.json().response)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}
