import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {env} from '../../env';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Error} from '../models/Error';
import {Car} from '../models/Car';
import {MsgService} from './msg';

@Injectable()
export class ChartsService {
  private carsSubDivisionsCompanyUrl = '/v1/companies/:car/notfound';

  constructor(private http: Http, private authService: AuthService, private router: Router, private msgService: MsgService) {
  }

  public getData(car): Observable<Car[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(env.backend + this.carsSubDivisionsCompanyUrl.replace(':car', String(car)), options)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }
}
