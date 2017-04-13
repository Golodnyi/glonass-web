import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {env} from '../../env';
import {Company} from '../models/Company';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Error} from '../models/Error';
import {TreeNode} from 'primeng/primeng';
import {MsgService} from './msg';

@Injectable()
export class CompaniesService {
    private companiesUrl = '/v1/companies';

    constructor(private http: Http, private authService: AuthService, private router: Router, private msgService: MsgService) {
    }

    public getCompanies(): Observable<Company[]> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(env.backend + this.companiesUrl, options)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error');
            });
    }

    public getCompaniesAsTree(leaf = false, selectable = false): Observable<TreeNode[]> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(env.backend + this.companiesUrl, options)
            .map((response: Response) => {
                let companies: Company[];
                const items: TreeNode[] = [];

                companies = response.json();
                companies.forEach(function (item) {
                    items.push(
                        {
                            'label': item.name,
                            'type': 'company',
                            'data': item.id,
                            'expandedIcon': 'fa-folder-open',
                            'collapsedIcon': 'fa-folder',
                            'leaf': leaf,
                            'selectable': selectable
                        }
                    );
                });

                return items;
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error');
            });
    }
}
