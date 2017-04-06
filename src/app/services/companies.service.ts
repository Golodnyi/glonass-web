import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {env} from "../../env";
import {Company} from "../models/Company";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Error} from "../models/Error";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CompaniesService {
    private companiesUrl = '/v1/companies';
    private company: Subject<Company> = new Subject();

    constructor(private http: Http, private authService: AuthService, private router: Router) {
    }

    public getCompanies(): Observable<Company[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(env.backend + this.companiesUrl, options)
            .map((response: Response) => {
                return response.json()
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router);
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    public setCompany(company: Company): void {
        this.company.next(company);
    }

    public getCompany(): Observable<Company> {
        return this.company.asObservable();
    }
}
