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
import { Engine } from '../models/Engine';
import { MsgService } from './msg';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CarsService {
  private cars: BehaviorSubject<Car[]> = new BehaviorSubject([]);
  private car: BehaviorSubject<Car> = new BehaviorSubject(new Car());

  constructor(private http: Http,
              private authService: AuthService,
              private enginesService: EnginesService,
              private router: Router,
              private msgService: MsgService) {
  }

  public all(company: number, subdivision: number, withEngine = false, resync = false): Observable<Car[]> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(env.backend + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars', options)
        .subscribe((response: Response) => {
          // TODO: костыль, переписать
          const carsObj: Car[] = [];
          response.json().forEach(car => {
            car = Object.assign(new Car(), car);
            if (withEngine) {
              this.enginesService.get(company, subdivision, car.id, true).take(1).subscribe(
                engine => {
                  if (engine.id) {
                    const engineObj = Object.assign(new Engine(), engine);
                    car.engine = engineObj;
                  }
                }
              );
            }
            carsObj.push(car);
            this.cars.next(carsObj);
            return this.cars.asObservable;
          });
          return carsObj;
        }, error => {
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
          const carObj: Car = Object.assign(new Car(), response.json());
          this.car.next(carObj);
          return this.car.asObservable();
        }, error => {
          Error.check(error, this.authService, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.json().message || 'Server error');
        });
    }
    return this.car.asObservable();
  }
}
