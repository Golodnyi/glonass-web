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
import {Subdivision} from '../models/Subdivision';
import {TreeNode} from 'primeng/primeng';
import {MsgService} from './msg';
import {UsersService} from './users.service';
import {CompaniesService} from './companies.service';
import {User} from '../models/User';

@Injectable()
export class SubdivisionsService {
    private subDivisionsUrl = '/v1/companies/:id/subdivisions';
    private getSubDivisionsUrl = '/v1/companies/1/subdivisions/:id';
    private createSubDivisionsUrl = '/v1/companies/:id/subdivisions';
    private updateSubDivisionsUrl = '/v1/companies/:company/subdivisions/:subdivision';

    constructor(private http: Http, private authService: AuthService, private router: Router, private msgService: MsgService, private usersService: UsersService, private companiesService: CompaniesService) {
    }

    public getSubdivisions(company: Company): Observable<Subdivision[]> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(env.backend + this.subDivisionsUrl.replace(':id', String(company.id)), options)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error');
            });
    }


    public getSubdivisionsAsTree(company: number, leaf = false, selectable = false): Observable<TreeNode[]> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});

        let subdivisions: Subdivision[];
        const items = [];

        return this.http.get(env.backend + this.subDivisionsUrl.replace(':id', String(company)), options)
            .map((response: Response) => {
                subdivisions = response.json();
                subdivisions.forEach(function (item) {
                    items.push(
                        {
                            'label': item.name,
                            'type': 'subdivision',
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

    public create(subdivision: Subdivision): Observable<Subdivision> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.post(
            env.backend + this.createSubDivisionsUrl.replace(':id', String(subdivision.company.id)),
            'name=' + subdivision.name + '&company_id=' + subdivision.company.id,
            options)
            .map((response: Response) => {
                const subdivisionObj: Subdivision = Object.assign(new Subdivision(), response.json());
                this.usersService.getUser(subdivisionObj.author_id).subscribe(
                    user => {
                        subdivisionObj.author = Object.assign(new User(), user);
                    },
                    error => {
                        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
                    }
                );
                this.companiesService.get(subdivisionObj.company_id).subscribe(
                    company => {
                        subdivisionObj.company = Object.assign(new Company(), company);
                    },
                    error => {
                        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
                    }
                );
                return subdivisionObj;
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error');
            });
    }

    public get(id: number): Observable<Subdivision> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(
            env.backend + this.getSubDivisionsUrl.replace(':id', String(id)), options)
            .map((response: Response) => {
                const subdivisionObj: Subdivision = Object.assign(new Subdivision(), response.json());
                this.usersService.getUser(subdivisionObj.author_id).subscribe(
                    user => {
                        subdivisionObj.author = Object.assign(new User(), user);
                    },
                    error => {
                        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
                    }
                );
                this.companiesService.get(subdivisionObj.company_id).subscribe(
                    company => {
                        subdivisionObj.company = Object.assign(new Company(), company);
                    },
                    error => {
                        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
                    }
                );
                return subdivisionObj;
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error');
            });
    }

    public update(subdivision: Subdivision): Observable<Subdivision> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.put(
            env.backend + this.updateSubDivisionsUrl.replace(':company', String(subdivision.company.id)).replace(':subdivision', String(subdivision.id)),
            'name=' + subdivision.name + '&company_id=' + subdivision.company.id,
            options)
            .map((response: Response) => {
                const subdivisionObj: Subdivision = Object.assign(new Subdivision(), response.json());
                this.usersService.getUser(subdivisionObj.author_id).subscribe(
                    user => {
                        subdivisionObj.author = Object.assign(new User(), user);
                    },
                    error => {
                        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
                    }
                );
                this.companiesService.get(subdivisionObj.company_id).subscribe(
                    company => {
                        subdivisionObj.company = Object.assign(new Company(), company);
                    },
                    error => {
                        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
                    }
                );
                return subdivisionObj;
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error');
            });
    }
}
