import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { Error } from '../models/error.model';
import { MsgService } from './msg';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CarModel } from '../models/car-model.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CarModelsService {
  private models: BehaviorSubject<CarModel[]> = new BehaviorSubject([]);
  private host: string = environment.host;

  constructor(private http: HttpClient,
              private router: Router,
              private msgService: MsgService) {
  }

  public all(resync = false): Observable<CarModel[]> {
    if (resync) {
      this.http.get(this.host + '/v1/car-models')
        .subscribe((response: any) => {
          const models = [];
          response.forEach(item => {
            models.push(Object.assign(new CarModel(), item));
          });
          this.models.next(models);
        }, error => {
          this.models.next([]);
          Error.check(error, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.statusText || 'Server error');
        });
    }
    return this.models.asObservable();
  }
}
