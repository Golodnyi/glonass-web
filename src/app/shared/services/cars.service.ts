import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { env } from '../../../env';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Error } from '../models/error.model';
import { Car } from '../models/car.model';
import { MsgService } from './msg';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { State } from '../../dashboard/state/shared/state.model';

@Injectable()
export class CarsService {
  private cars: BehaviorSubject<Car[]> = new BehaviorSubject([]);
  private car: BehaviorSubject<Car> = new BehaviorSubject(new Car());
  private state: BehaviorSubject<State> = new BehaviorSubject(new State());

  constructor(private http: Http,
              private authService: AuthService,
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

  public byCompany(company: number, resync = false): Observable<Car[]> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(env.backend + '/v1/cars/company/' + company, options)
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

  /**
   * name:test
   model_id:1
   subdivision_id:1
   is_visible:true
   * @param car
   * @returns {Observable<R|T>}
   */
  public create(car: Car): Observable<Car> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(
      env.backend + '/v1/cars',
      'name=' + car.name + '&model_id=' + car.model_id + '&subdivision_id=' + car.subdivision_id,
      options)
      .map((response: Response) => {
        const carObj: Car = Object.assign(new Car(), response.json());
        const list = [];
        this.cars.getValue().forEach(c => {
          list.push(Object.assign(new Car(), c));
        });
        list.push(Object.assign(new Car(), carObj));
        this.cars.next(list);
        return carObj;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public getState(car: number): Observable<State> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(env.backend + '/v1/cars/' + car + '/last-state', options)
      .map((response: Response) => {
        return Object.assign(new State(), response.json());
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }
}
