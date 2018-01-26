import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {MsgService} from '../../../../shared/services/msg';
import {environment} from '../../../../../environments/environment';
import {Error} from '../../../../shared/models/error.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StateService {
  private host: string = environment.host;

  constructor(private http: HttpClient,
              private router: Router,
              private msgService: MsgService) {
  }

  public getMonitor(warning: boolean): Observable<any> {
    if (warning) {
      return this.http.get(this.host + '/v1/cars/monitor/warnings')
        .map((response: any) => {
          return response;
        }).catch((error: any) => {
          Error.check(error, this.router, this.msgService);
          return Observable.throw(error.error.message || 'Server error');
        });
    }

    return this.http.get(this.host + '/v1/cars/monitor')
      .map((response: any) => {
        return response;
      }).catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.error.message || 'Server error');
      });
  }
}
