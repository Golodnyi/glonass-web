import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Error } from '../models/error.model';
import { MsgService } from './msg';
import { Engine } from '../models/engine.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';

@Injectable()
export class EnginesService {
  private engine: BehaviorSubject<Engine> = new BehaviorSubject(new Engine());
  private host: string = environment.host;

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

      this.http.get(this.host + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars/' + car + '/engine', options)
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
