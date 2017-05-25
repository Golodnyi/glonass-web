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
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SensorsService {
  private sensors: Subject<any[]> = new Subject();

  constructor(private http: Http,
              private authService: AuthService,
              private router: Router,
              private msgService: MsgService) {
  }

  public all(car: number, resync = false): Observable<any> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(env.backend + '/v1/cars/' + car + '/sensors', options)
        .subscribe((response: Response) => {
          this.sensors.next(response.json());
        }, error => {
          Error.check(error, this.authService, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.json().message || 'Server error');
        });
    }
    return this.sensors.asObservable();
  }
}
