import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../shared/services/auth.service';
import { MsgService } from '../../../shared/services/msg';
import { Error } from '../../../shared/models/error.model';
import { Car } from '../../../shared/models/car.model';

@Injectable()
export class ResetService {
  private host: string = environment.host;

  constructor(private http: Http,
              private authService: AuthService,
              private router: Router,
              private msgService: MsgService) {
  }

  public reset(data: any, car: Car): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(
      this.host + '/v1/engine-maintenances/',
      'engine_id=' + car.engine.id + 'date=' + data['date'] + '&comment=' + data['comment'],
      options)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }
}
