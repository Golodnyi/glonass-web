import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {Error} from '../models/error.model';
import {Car} from '../models/car.model';
import {MsgService} from './msg';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {State} from '../../dashboard/state/shared/state.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CarsService {
  private cars: BehaviorSubject<Car[]> = new BehaviorSubject([]);
  private car: BehaviorSubject<Car> = new BehaviorSubject(new Car());
  private host: string = environment.host;

  constructor(private http: HttpClient,
              private router: Router,
              private msgService: MsgService) {
  }

  public all(company: number, subdivision: number, resync = false): Observable<Car[]> {
    if (resync) {
      this.http.get(this.host + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars')
        .subscribe((response: any) => {
          const cars = [];
          response.forEach(item => {
            cars.push(Object.assign(new Car(), item));
          });
          this.cars.next(cars);
        }, error => {
          this.cars.next([]);
          Error.check(error, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.statusText || 'Server error');
        });
    }
    return this.cars.asObservable();
  }

  public all_sync(company: number, subdivision: number): Observable<Car[]> {
    return this.http.get(this.host + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars')
      .map((response: any) => {
        return response;
      }).catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public get(car: number, resync = false): Observable<Car> {
    if (resync) {
      this.http.get(this.host + '/v1/cars/' + car)
        .subscribe((response: any) => {
          this.car.next(Object.assign(new Car(), response));
        }, error => {
          this.car.next(new Car());
          Error.check(error, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.statusText || 'Server error');
        });
    }
    return this.car.asObservable();
  }

  public getWithoutSubject(car: number): Observable<Car> {
    return this.http.get(this.host + '/v1/cars/' + car)
      .map((response: any) => {
        return Object.assign(new Car(), response);
      }, error => {
        this.car.next(new Car());
        Error.check(error, this.router, this.msgService);
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error.statusText || 'Server error');
      });
  }

  public create(car: Car): Observable<Car> {
    return this.http.post(this.host + '/v1/cars', car)
      .map((response: any) => {
        const carObj: Car = Object.assign(new Car(), response);
        const list = [];
        this.cars.getValue().forEach(c => {
          list.push(Object.assign(new Car(), c));
        });
        list.push(Object.assign(new Car(), carObj));
        this.cars.next(list);
        return carObj;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public update(car: Car): Observable<Car> {
    return this.http.put(this.host + '/v1/cars/' + car.id, car)
      .map((response: any) => {
        const carObj: Car = Object.assign(new Car(), response);
        const list = [];
        this.cars.getValue().filter(c => {
          if (c.id === carObj.id) {
            c = carObj;
          }
          list.push(c);
        });
        this.cars.next(list);
        return carObj;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public getState(car: number): Observable<State> {
    return this.http.get(this.host + '/v1/cars/' + car + '/last-state')
      .map((response: any) => {
        return Object.assign(new State(), response);
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }
}
