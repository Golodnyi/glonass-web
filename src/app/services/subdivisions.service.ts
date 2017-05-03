import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { env } from '../../env';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Error } from '../models/Error';
import { Subdivision } from '../models/Subdivision';
import { MsgService } from './msg';

@Injectable()
export class SubdivisionsService {

  constructor(private http: Http,
              private authService: AuthService,
              private router: Router,
              private msgService: MsgService) {
  }

  public all(company: number): Observable<Subdivision[]> {
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
      env.backend + '/v1/companies/' + subdivision.company_id + '/subdivisions',
      'name=' + subdivision.name + '&company_id=' + subdivision.company_id,
      options)
      .map((response: Response) => {
        const subdivisionObj: Subdivision = Object.assign(new Subdivision(), response.json());
        return subdivisionObj;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public get(company: number, subdivision: number): Observable<Subdivision> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(
      env.backend + '/v1/companies/' + company + '/subdivisions/' + subdivision, options)
      .map((response: Response) => {
        const subdivisionObj: Subdivision = Object.assign(new Subdivision(), response.json());
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
      env.backend + '/v1/companies/' + subdivision.company_id + '/subdivisions/' + subdivision.id,
      'name=' + subdivision.name,
      options)
      .map((response: Response) => {
        const subdivisionObj: Subdivision = Object.assign(new Subdivision(), response.json());
        return subdivisionObj;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public delete(subdivision: Subdivision): Observable<boolean> {
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
