import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { env } from '../../env';
import { AuthService } from './auth.service';
import { EnginesService } from './engines.service';
import { Router } from '@angular/router';
import { Error } from '../models/Error';
import { Car } from '../models/Car';
import { MsgService } from './msg';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class CarsService {
  private cars: BehaviorSubject<Car[]> = new BehaviorSubject([]);
  private car: BehaviorSubject<Car> = new BehaviorSubject(new Car());
  private subscriptionEngine: Subscription;

  constructor(private http: Http,
              private authService: AuthService,
              private enginesService: EnginesService,
              private router: Router,
              private msgService: MsgService) {
  }

  public all(company: number, subdivision: number, resync = false): Observable<Car[]> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(env.backend + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars', options)
        .subscribe((response: Response) => {
          const cars = [];
          response.json().forEach(item => {
            cars.push(Object.assign(new Car(), item));
          });
          this.cars.next(cars);
        }, error => {
          this.cars.next([]);
          Error.check(error, this.authService, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.json().message || 'Server error');
        });
    }
    return this.cars.asObservable();
  }

  public get(car: number, resync = false): Observable<Car> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(env.backend + '/v1/cars/' + car, options)
        .subscribe((response: Response) => {
          this.car.next(Object.assign(new Car(), response.json()));
        }, error => {
          this.car.next(new Car());
          Error.check(error, this.authService, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.json().message || 'Server error');
        });
    }
    return this.car.asObservable();
  }
}
