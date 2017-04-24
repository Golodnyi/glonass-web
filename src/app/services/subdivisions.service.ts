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
import {Subdivision} from '../models/Subdivision';
import {MsgService} from './msg';
import {UsersService} from './users.service';
import {CompaniesService} from './companies.service';
import {User} from '../models/User';

@Injectable()
export class SubdivisionsService {

  constructor(private http: Http, private authService: AuthService, private router: Router, private msgService: MsgService, private usersService: UsersService, private companiesService: CompaniesService) {
  }

  public getSubdivisions(company: number): Observable<Subdivision[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(env.backend + '/v1/companies/' + company + '/subdivisions', options)
      .map((response: Response) => {
        // TODO: костыль, переписать
        const subdivisions: Subdivision[] = response.json();
        const subdivisionsObj: Subdivision[] = [];
        subdivisions.forEach(function (subdivision: Subdivision) {
          subdivisionsObj.push(Object.assign(new Subdivision(), subdivision));
        });
        return subdivisionsObj;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public create(subdivision: Subdivision): Observable<Subdivision> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.post(
      env.backend + '/v1/companies/' + subdivision.company.id + '/subdivisions',
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
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public get(id: number): Observable<Subdivision> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(
      env.backend + '/v1/companies/1/subdivisions/' + id, options)
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
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public update(subdivision: Subdivision): Observable<Subdivision> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.put(
      env.backend + '/v1/companies/' + subdivision.company.id + '/subdivisions/' + subdivision.id,
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
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public delete(subdivision: Subdivision): Observable<boolean> {
    if (!confirm('Вы действительно хотите удалить подразделение?')) {
      return null;
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.delete(env.backend + '/v1/companies/1/subdivisions/' + subdivision.id, options)
      .map((response: Response) => {
        this.msgService.notice(MsgService.SUCCESS, 'Удалена', response.json().message);
        return true;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }
}
