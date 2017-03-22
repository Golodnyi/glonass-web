import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../models/User';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {env} from "../../env";
import {Company} from "../models/Company";
import {AuthService} from "./auth.service";

@Injectable()
export class CompaniesService {
    private companiesUrl = '/v1/companies';

    constructor (private http: Http, private authService: AuthService) {}

    public getCompanies(): Observable<Company[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(env.backend + this.companiesUrl, options)
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
