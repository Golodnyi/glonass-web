import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {AuthService} from '../../../../shared/services/auth.service';
import {MsgService} from '../../../../shared/services/msg';
import {environment} from '../../../../../environments/environment';
import {Error} from '../../../../shared/models/error.model';

@Injectable()
export class StateService {
  private host: string = environment.host;

  constructor(private http: Http,
              private router: Router,
              private authService: AuthService,
              private msgService: MsgService) {
  }

  public getMonitor(warning: boolean): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});
    if (warning) {
      return this.http.get(this.host + '/v1/cars/monitor/warnings', options)
        .map((response: Response) => {
          return response.json();
        }).catch((error: any) => {
          Error.check(error, this.authService, this.router, this.msgService);
          return Observable.throw(error.json().message || 'Server error');
        });
    }

    return this.http.get(this.host + '/v1/cars/monitor', options)
      .map((response: Response) => {
        return response.json();
      }).catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }
}
