import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Error} from '../models/error.model';
import {Car} from '../models/car.model';
import {MsgService} from './msg';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {State} from '../../dashboard/state/shared/state.model';
import {environment} from '../../../environments/environment';

@Injectable()
export class CarsService {
  private cars: BehaviorSubject<Car[]> = new BehaviorSubject([]);
  private car: BehaviorSubject<Car> = new BehaviorSubject(new Car());
  private state: BehaviorSubject<State> = new BehaviorSubject(new State());
  private host: string = environment.host;

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

      this.http.get(this.host + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars', options)
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

  public all_sync(company: number, subdivision: number): Observable<Car[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(this.host + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars', options)
      .map((response: Response) => {
        return response.json();
      }).catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public get(car: number, resync = false): Observable<Car> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(this.host + '/v1/cars/' + car, options)
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

  public create(car: Car): Observable<Car> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.host + '/v1/cars', car, options)
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

    return this.http.get(this.host + '/v1/cars/' + car + '/last-state', options)
      .map((response: Response) => {
        return Object.assign(new State(), response.json());
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }
}
