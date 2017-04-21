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
import {TreeNode} from 'primeng/primeng';
import {MsgService} from './msg';

@Injectable()
export class CarsService {
  private carsSubDivisionsCompanyUrl = '/v1/companies/:company/subdivisions/:subdivision/cars';

  constructor(private http: Http, private authService: AuthService, private router: Router, private msgService: MsgService) {
  }

  public getCars(company, subdivision): Observable<Car[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get(env.backend + this.carsSubDivisionsCompanyUrl.replace(':company', String(company)).replace(':subdivision', String(subdivision)), options)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  public getCarsAsTree(company, subdivision, leaf = false, selectable = false): Observable<TreeNode[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    let cars: Car[];
    const items = [];

    return this.http.get(env.backend + this.carsSubDivisionsCompanyUrl.replace(':company', String(company)).replace(':subdivision', String(subdivision)), options)
      .map((response: Response) => {
        cars = response.json();
        cars.forEach(function (item) {
          items.push(
            {
              'label': item.name,
              'type': 'car',
              'data': item.id,
              'expandedIcon': 'fa-folder-open',
              'collapsedIcon': 'fa-folder',
              'leaf': leaf,
              'selectable': selectable
            }
          );
        });

        return items;
      })
      .catch((error: any) => {
        Error.check(error, this.authService, this.router, this.msgService);
        return Observable.throw(error.json().message || 'Server error');
      });
  }
}
