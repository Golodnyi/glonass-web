import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Company } from '../models/company.model';
import { MsgService } from './msg';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable()
export class CompaniesService {
    private companies: BehaviorSubject<Company[]> = new BehaviorSubject([]);
    private company: BehaviorSubject<Company>     = new BehaviorSubject(new Company());
    private host: string                          = environment.host;

    constructor(private http: HttpClient,
                private msgService: MsgService,
                private errorService: ErrorService) {
    }

    public all(resync = false): Observable<Company[]> {
        if (resync) {
            this.http.get(this.host + '/v1/companies')
                .subscribe((response: any) => {
                        const companies = [];
                        response.forEach(item => {
                            companies.push(Object.assign(new Company(), item));
                        });
                        this.companies.next(companies);
                    },
                    error => {
                        this.companies.next([]);
                        this.errorService.check(error);
                    });
        }
        return this.companies.asObservable();
    }

    public get(company: number, resync = false): Observable<Company> {
        if (resync) {
            this.http.get(this.host + '/v1/companies/' + company)
                .subscribe((response: any) => {
                    this.company.next(Object.assign(new Company(), response));
                }, error => {
                    this.company.next(new Company());
                    this.errorService.check(error);
                });
        }
        return this.company.asObservable();
    }

    public update(company: Company): Observable<Company> {
        return this.http.put(this.host + '/v1/companies/' + company.id, company)
            .map((response: any) => {
                const companyObj: Company = Object.assign(new Company(), response);
                this.company.next(companyObj);
                this.companies.next(
                    this.companies.getValue().map(companyFilter => {
                        if (companyFilter.id === companyObj.id) {
                            companyFilter = companyObj;
                        }
                        return companyFilter;
                    }));
                return companyObj;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return Observable.throw(error.error.message || 'Server error');
            });
    }

    public create(company: Company): Observable<Company> {
        return this.http.post(this.host + '/v1/companies', company)
            .map((response: any) => {
                const companyObj: Company = Object.assign(new Company(), response);
                const list                = [];
                this.companies.getValue().forEach(c => {
                    list.push(Object.assign(new Company(), c));
                });
                list.push(Object.assign(new Company(), companyObj));
                this.companies.next(list);
                return companyObj;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return Observable.throw(error.error.message || 'Server error');
            });
    }

    public delete(company: Company): Observable<boolean> {
        return this.http.delete(this.host + '/v1/companies/' + company.id)
            .map((response: any) => {
                this.msgService.notice(MsgService.SUCCESS, 'Удалена', response.message);
                const list = [];
                this.companies.getValue().forEach(c => {
                    if (company.id !== c.id) {
                        list.push(Object.assign(new Company(), c));
                    }
                });
                this.companies.next(list);
                return true;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return Observable.throw(error.error.message || 'Server error');
            });
    }
}
