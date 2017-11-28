import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../shared/services/auth.service';
import { MsgService } from '../../../shared/services/msg';
import { Error } from '../../../shared/models/error.model';
import { Car } from '../../../shared/models/car.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResetService {
  private host: string = environment.host;

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private msgService: MsgService) {
  }

  public reset(data: any): Observable<any> {
    return this.http.post(
      this.host + '/v1/engine-maintenances/scheduled', data)
      .map((response: any) => {
        return response;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public resetGaranted(data: any): Observable<any> {
    return this.http.post(
      this.host + '/v1/engine-maintenances/', data)
      .map((response: any) => {
        return response;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public all(car: Car): Observable<any> {
    return this.http.get(
      this.host + '/v1/engine-maintenances/engine/' + car.engine.id + '/scheduled')
      .map((response: any) => {
        return response;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public allGaranted(car: Car): Observable<any> {
    return this.http.get(
      this.host + '/v1/engine-maintenances/engine/' + car.engine.id)
      .map((response: any) => {
        return response;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }
}
