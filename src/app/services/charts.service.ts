import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { env } from '../../env';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MsgService } from './msg';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Filter } from '../models/Filter';

@Injectable()
export class ChartsService {
  private data: BehaviorSubject<any> = new BehaviorSubject(null);
  private filter: BehaviorSubject<Filter> = new BehaviorSubject(null);
  private autoRefresh: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: Http,
              private authService: AuthService,
              private router: Router,
              private msgService: MsgService) {
  }

  public setFilter(filter: Filter) {
    this.filter.next(filter);
  }

  public getFilter() {
    return this.filter.asObservable();
  }

  public setAutoRefresh(autoRefresh: any) {
    this.autoRefresh.next(autoRefresh);
  }

  public getAutoRefresh() {
    return this.autoRefresh.asObservable();
  }

  public resync(car: number): void {
    const filter = this.filter.getValue();
    const autoRefresh = this.autoRefresh.getValue();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});
    let params = '?';
    if (filter && filter.enabled) {
      filter.charts.forEach(function (sensor) {
        params += '&sensors[]=' + sensor + '&';
      });

      if (!filter.last) {
        params += 'dateFrom=' + filter.before + '&dateTo=' + filter.after + '&';
      }
    }
    if (autoRefresh && autoRefresh.enabled && ((filter && !filter.last && filter.enabled) || !filter)) {
      params += 'afterTime=' + autoRefresh.afterTime;
    }
    this.http.get(env.backend + '/v1/cars/' + car + '/report' + params, options)
      .subscribe((response: Response) => {
        this.data.next(response.json());
      }, error => {
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
      });
  }

  public get(): Observable<any> {
    return this.data.asObservable();
  }
}

