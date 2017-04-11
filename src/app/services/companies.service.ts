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
import {TreeNode} from "primeng/primeng";
import {forEach} from "@angular/router/src/utils/collection";
import {MsgService} from "./msg";

@Injectable()
export class CompaniesService {
    private companiesUrl = '/v1/companies';

    constructor(private http: Http, private authService: AuthService, private router: Router, private msgService: MsgService) {
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
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    public getCompaniesAsTree(leaf: boolean = false, selectable: boolean = false): Observable<TreeNode[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({headers: headers, withCredentials: true});

        var companies: Company[];
        var items: TreeNode[] = [];

        return this.http.get(env.backend + this.companiesUrl, options)
            .map((response: Response) => {
                companies = response.json();
                companies.forEach(function (item) {
                    items.push(
                        {
                            "label": item.name,
                            "type": "company",
                            "data": item.id,
                            "expandedIcon": "fa-folder-open",
                            "collapsedIcon": "fa-folder",
                            "leaf": leaf,
                            "selectable": selectable
                        }
                    );
                });

                return items;
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error')
            });
    }
}
