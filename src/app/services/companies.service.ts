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
import * as moment from 'moment';
import {UsersService} from './users.service';
import {User} from '../models/User';

@Injectable()
export class CompaniesService {
    private companiesUrl = '/v1/companies';
    private getUrl = '/v1/companies/:id';
    private deleteUrl = '/v1/companies/:id';
    private updateUrl = '/v1/companies/:id';
    private createUrl = '/v1/companies';

    constructor(private http: Http, private authService: AuthService, private router: Router, private msgService: MsgService, private usersService: UsersService) {
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

    public get(company: number): Observable<Company> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(env.backend + this.getUrl.replace(':id', String(company)), options)
            .map((response: Response) => {
                const companyObj: Company = Object.assign(new Company(), response.json());
                this.usersService.getUser(companyObj.author_id).subscribe(
                    user => {
                        companyObj.author = Object.assign(new User, user);
                    }
                );
                return companyObj;
            })
            .catch((error: any) => {
                console.log(error);
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error');
            });
    }

    public update(company: Company): Observable<Company> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.put(
            env.backend + this.updateUrl.replace(':id', String(company.id)),
            'name=' + company.name + '&active_till=' + moment(company.active_till).format('YYYY-MM-DD HH:mm:ss'),
            options)
            .map((response: Response) => {
                const companyObj: Company = Object.assign(new Company(), response.json());
                this.usersService.getUser(companyObj.author_id).subscribe(
                    user => {
                        companyObj.author = Object.assign(new User, user);
                    }
                );
                return companyObj;
            })
            .catch((error: any) => {
                console.log(error);
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error');
            });
    }

    public create(company: Company): Observable<Company> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(
            env.backend + this.createUrl,
            'name=' + company.name + '&active_till=' + moment(company.active_till).format('YYYY-MM-DD HH:mm:ss') + '&author_id=' + company.author.id,
            options)
            .map((response: Response) => {
                const companyObj: Company = Object.assign(new Company(), response.json());
                this.usersService.getUser(companyObj.author_id).subscribe(
                    user => {
                        companyObj.author = Object.assign(new User, user);
                    }
                );
                return companyObj;
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error');
            });
    }

    public delete(company: Company): Observable<boolean> {
        if (!confirm('Вы действительно хотите удалить компанию?')) {
            return null;
        }
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});
        return this.http.delete(env.backend + this.deleteUrl.replace(':id', String(company.id)), options)
            .map((response: Response) => {
                this.msgService.notice(MsgService.SUCCESS, 'Удалена', response.json().message);
                return true;
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error');
            });
    }
}
