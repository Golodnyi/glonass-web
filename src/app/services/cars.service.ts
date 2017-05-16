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

@Injectable()
export class CarsService {

  constructor(private http: Http,
              private authService: AuthService,
              private enginesService: EnginesService,
              private router: Router,
              private msgService: MsgService) {
  }

  public all(company: number, subdivision: number, withEngine = false): Observable<Car[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(env.backend + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars', options)
      .map((response: Response) => {
        // TODO: костыль, переписать
        const cars: Car[] = response.json();
        const carsObj: Car[] = [];
        const engServ = this.enginesService;
        cars.forEach(function (car: Car) {
          if (withEngine) {
            engServ.get(company, subdivision, car.id).subscribe(
              engine => {
                const engineObj = Object.assign(new Engine(), engine);
                car.engine = engineObj;
              }
            );
          }
          carsObj.push(Object.assign(new Car(), car));
        });
        return carsObj;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }
}
