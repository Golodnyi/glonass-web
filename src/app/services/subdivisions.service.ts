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
import {Subdivision} from "../models/Subdivision";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SubdivisionsService {
    private subDivisionsCompanyUrl = '/v1/companies/:id/subdivisions';
    private subdivision: Subject<Subdivision> = new Subject();

    constructor(private http: Http, private authService: AuthService, private router: Router) {
    }

    public getSubdivisions(company: Company): Observable<Subdivision[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(env.backend + this.subDivisionsCompanyUrl.replace(':id', String(company.id)), options)
            .map((response: Response) => {
                return response.json()
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router);
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    public setSubdivision(subdivision: Subdivision): void {
        this.subdivision.next(subdivision);
    }

    public getSubdivision(): Observable<Subdivision> {
        return this.subdivision.asObservable();
    }
}
