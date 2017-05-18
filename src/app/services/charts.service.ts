import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { env } from '../../env';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Error } from '../models/Error';
import { MsgService } from './msg';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Filter } from '../models/Filter';

@Injectable()
export class ChartsService {
  private data: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: Http,
              private authService: AuthService,
              private router: Router,
              private msgService: MsgService) {
  }

  public resync(car: number, filter: Filter = null): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});
    let params = '?';
    if (filter && filter.enabled) {
      params += 'dateFrom=' + filter.before + '&dateTo=' + filter.after;
      filter.charts.forEach(function (sensor) {
        params += '&sensors[]=' + sensor;
      });
    }

    return this.http.get(env.backend + '/v1/cars/' + car + '/report' + params, options)
      .map((response: Response) => {
        this.data.next(response.json());
        return response.json();
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public get(car: number, resync = true): Observable<any> {
    if (resync) {
      this.resync(car).subscribe();
    }
    return this.data.asObservable();
  }

  public filter(car: number, filter: Filter): void {
    this.resync(car, filter).subscribe();
  }
}
