import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { env } from '../../env';
import { Company } from '../models/Company';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Error } from '../models/Error';
import { MsgService } from './msg';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CompaniesService {
  private companies: BehaviorSubject<Company[]> = new BehaviorSubject([]);
  private company: BehaviorSubject<Company> = new BehaviorSubject(new Company());

  constructor(private http: Http,
              private authService: AuthService,
              private router: Router,
              private msgService: MsgService) {
  }

  public all(resync = false): Observable<Company[]> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(env.backend + '/v1/companies', options)
        .subscribe((response: Response) => {
            const companies: Company[] = response.json();
            const companiesObj: Company[] = [];

            if (!companies.length) {
              this.companies.next([]);
            }

            companies.forEach(function (company: Company) {
              companiesObj.push(Object.assign(new Company(), company));
            });
            this.companies.next(companiesObj);
          },
          error => {
            Error.check(error, this.authService, this.router, this.msgService);
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error.json().message || 'Server error');
          });
    }
    return this.companies.asObservable();
  }

  public get(company: number, resync = false): Observable<Company> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(env.backend + '/v1/companies/' + company, options)
        .subscribe((response: Response) => {
          const companyObj: Company = Object.assign(new Company(), response.json());
          this.company.next(companyObj);
        }, error => {
          this.company.next(null);
          Error.check(error, this.authService, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.json().message || 'Server error');
        });
    }
    return this.company.asObservable();
  }

  public update(company: Company): Observable<Company> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.put(
      env.backend + '/v1/companies/' + company.id,
      'name=' + company.name + '&active_till=' + company.active_till,
      options)
      .map((response: Response) => {
        const companyObj: Company = Object.assign(new Company(), response.json());
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
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public create(company: Company): Observable<Company> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.post(
      env.backend + '/v1/companies',
      'name=' + company.name + '&active_till=' + company.active_till,
      options)
      .map((response: Response) => {
        const companyObj: Company = Object.assign(new Company(), response.json());
        const list = [];
        this.companies.getValue().forEach(c => {
          list.push(Object.assign(new Company(), c));
        });
        list.push(Object.assign(new Company(), companyObj));
        this.companies.next(list);
        return companyObj;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public delete(company: Company): Observable<boolean> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.delete(env.backend + '/v1/companies/' + company.id, options)
      .map((response: Response) => {
        this.msgService.notice(MsgService.SUCCESS, 'Удалена', response.json().message);
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
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }
}
