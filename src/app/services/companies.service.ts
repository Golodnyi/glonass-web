import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {env} from '../../env';
import {Company} from '../models/Company';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Error} from '../models/Error';
import {MsgService} from './msg';
import {UsersService} from './users.service';
import {User} from '../models/User';

@Injectable()
export class CompaniesService {

  constructor(private http: Http,
              private authService: AuthService,
              private router: Router,
              private msg: MsgService,
              private usersService: UsersService) {
  }

  public getCompanies(): Observable<Company[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(env.backend + '/v1/companies', options)
      .map((response: Response) => {
        // TODO: костыль, переписать
        const companies: Company[] = response.json();
        const companiesObj: Company[] = [];
        companies.forEach(function (company: Company) {
          companiesObj.push(Object.assign(new Company(), company));
        });
        return companiesObj;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msg);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public get(company: number): Observable<Company> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(env.backend + '/v1/companies/' + company, options)
      .map((response: Response) => {
        const companyObj: Company = Object.assign(new Company(), response.json());
        return companyObj;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msg);
        return Observable.throw(error.json().message || 'Server error');
      });
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
        return companyObj;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msg);
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
        return companyObj;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msg);
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
    return this.http.delete(env.backend + '/v1/companies/' + company.id, options)
      .map((response: Response) => {
        this.msg.notice(MsgService.SUCCESS, 'Удалена', response.json().message);
        return true;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msg);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public findByName(name: string, companies: Company[] = null): Company[] {
    if (companies === null) {
      companies = [];
      // TODO: отправка запроса на бэкенд
    }
    companies = companies.filter(function (obj) {
      return obj.name.toLowerCase().startsWith(name.toLowerCase());
    });

    return companies;
  }
}
