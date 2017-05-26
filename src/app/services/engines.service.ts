import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { env } from '../../env';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Error } from '../models/Error';
import { MsgService } from './msg';
import { Engine } from '../models/Engine';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EnginesService {
  private engine: BehaviorSubject<Engine> = new BehaviorSubject(new Engine());

  constructor(private http: Http,
              private authService: AuthService,
              private router: Router,
              private msgService: MsgService) {
  }

  public get(company: number, subdivision: number, car: number, resync = false): Observable<Engine> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(env.backend + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars/' + car + '/engine', options)
        .subscribe((response: Response) => {
          this.engine.next(Object.assign(new Engine(), response.json()));
        }, error => {
          this.engine.next(new Engine());
          Error.check(error, this.authService, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.json().message || 'Server error');
        });
    }
    return this.engine.asObservable();
  }
}
