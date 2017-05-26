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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SubdivisionsService {
  private subdivisions: BehaviorSubject<Subdivision[]> = new BehaviorSubject([]);
  private subdivision: BehaviorSubject<Subdivision> = new BehaviorSubject(new Subdivision());

  constructor(private http: Http,
              private authService: AuthService,
              private router: Router,
              private msgService: MsgService) {
  }

  public all(company: number, resync = false): Observable<Subdivision[]> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(env.backend + '/v1/companies/' + company + '/subdivisions', options)
        .subscribe((response: Response) => {
          const subdivisions: Subdivision[] = response.json();
          const subdivisionsObj: Subdivision[] = [];
          subdivisions.forEach(function (subdivision: Subdivision) {
            subdivisionsObj.push(Object.assign(new Subdivision(), subdivision));
          });
          this.subdivisions.next(subdivisionsObj);
        }, error => {
          Error.check(error, this.authService, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.json().message || 'Server error');
        });
    }
    return this.subdivisions.asObservable();
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
        const list = [];
        this.subdivisions.getValue().forEach(c => {
          list.push(Object.assign(new Subdivision(), c));
        });
        list.push(Object.assign(new Subdivision(), subdivisionObj));
        this.subdivisions.next(list);
        return subdivisionObj;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public get(company: number, subdivision: number, resync = false): Observable<Subdivision> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(
        env.backend + '/v1/companies/' + company + '/subdivisions/' + subdivision, options)
        .subscribe((response: Response) => {
          const subdivisionObj: Subdivision = Object.assign(new Subdivision(), response.json());
          this.subdivision.next(subdivisionObj);
        }, error => {
          Error.check(error, this.authService, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.json().message || 'Server error');
        });
    }
    return this.subdivision.asObservable();
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
        this.subdivision.next(subdivisionObj);
        this.subdivisions.next(
          this.subdivisions.getValue().map(subdivisionFilter => {
            if (subdivisionFilter.id === subdivisionObj.id) {
              subdivisionFilter = subdivisionObj;
            }
            return subdivisionFilter;
          }));
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
        const list = [];
        this.subdivisions.getValue().forEach(c => {
          if (subdivision.id !== c.id) {
            list.push(Object.assign(new Subdivision(), c));
          }
        });
        this.subdivisions.next(list);
        return true;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }
}
