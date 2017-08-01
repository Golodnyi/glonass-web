import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MsgService } from './msg';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Filter } from '../models/filter.model';
import { Subject } from 'rxjs/Subject';
import { AutoRefresh } from '../models/auto-refresh.model';
import { Error } from '../models/error.model';
import { Sensor } from '../models/sensor.model';
import { Car } from '../models/car.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class ChartsService {
  private data: Subject<any> = new Subject();
  private car: Subject<Car> = new Subject();
  private filter: BehaviorSubject<Filter> = new BehaviorSubject(new Filter());
  private sensors: BehaviorSubject<Sensor[]> = new BehaviorSubject([]);
  private autoRefresh: BehaviorSubject<AutoRefresh> = new BehaviorSubject(new AutoRefresh());
  private host: string = environment.host;

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

  public setCar(car: Car) {
    this.car.next(car);
  }

  public getCar(): Observable<Car> {
    return this.car.asObservable();
  }

  public setAutoRefresh(autoRefresh: any) {
    this.autoRefresh.next(autoRefresh);
  }

  public getAutoRefresh() {
    return this.autoRefresh.asObservable();
  }

  public mapData(car: number): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(this.host + '/v1/cars/' + car + '/report/map', options)
      .map((response: Response) => {
        return response.json();
      }).catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public resync(car: number): void {
    const filter = this.filter.getValue();
    const autoRefresh = this.autoRefresh.getValue();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});
    let params = '?';
    if (filter.enabled) {
      if (!Array.isArray(filter.charts) && filter.charts !== undefined) {
        params += 'sensors[]=' + filter.charts + '&';
      } else if (Array.isArray(filter.charts)) {
        filter.charts.forEach(function (sensor) {
          params += 'sensors[]=' + sensor + '&';
        });
      }
      if (!filter.last) {
        params += 'dateFrom=' + filter.before + '&dateTo=' + filter.after + '&';
      }
    }
    if (autoRefresh.enabled && ((filter.last && filter.enabled) || !filter.enabled)) {
      params += 'afterTime=' + autoRefresh.afterTime;
    }
    this.http.get(this.host + '/v1/cars/' + car + '/report' + params, options)
      .subscribe((response: Response) => {
        this.data.next(response.json().data);
        this.sensors.next(response.json().allowedSensors);
      }, error => {
        Error.check(error, this.authService, this.router, this.msgService);
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
      });
  }

  public get(): Observable<any> {
    return this.data.asObservable();
  }

  public getSensors(): Observable<any> {
    return this.sensors.asObservable();
  }

  public getTable(car: number, move = false, page: number, sort = 'time', dir = 'desc'): Observable<any> {
    const filter = this.filter.getValue();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});
    let params = '?page=' + (page + 1) + '&';
    if (filter.enabled) {
      if (!Array.isArray(filter.charts) && filter.charts !== undefined) {
        params += 'sensors[]=' + filter.charts + '&';
      } else if (Array.isArray(filter.charts)) {
        filter.charts.forEach(function (sensor) {
          params += 'sensors[]=' + sensor + '&';
        });
      }
      if (!filter.last) {
        params += 'dateFrom=' + filter.before + '&dateTo=' + filter.after + '&';
      }
    }
    if (move) {
      params += 'drive=1&';
    }
    params += 'sort=' + sort + '&sortDirection=' + dir;
    return this.http.get(this.host + '/v1/cars/' + car + '/report/table' + params, options)
      .map((response: Response) => {
        return response.json();
      }).catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }
}
