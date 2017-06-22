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
import { CarModel } from '../models/car-model.model';

@Injectable()
export class CarModelsService {
  private models: BehaviorSubject<CarModel[]> = new BehaviorSubject([]);

  constructor(private http: Http,
              private authService: AuthService,
              private router: Router,
              private msgService: MsgService) {
  }

  public all(resync = false): Observable<Car[]> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(env.backend + '/v1/car-models', options)
        .subscribe((response: Response) => {
          const models = [];
          response.json().forEach(item => {
            models.push(Object.assign(new CarModel(), item));
          });
          this.models.next(models);
        }, error => {
          this.models.next([]);
          Error.check(error, this.authService, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.json().message || 'Server error');
        });
    }
    return this.models.asObservable();
  }
}