import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Error} from '../models/error.model';
import {MsgService} from './msg';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../../environments/environment';
import {EngineModel} from '../models/engine-model.model';

@Injectable()
export class EngineModelsService {
  private models: BehaviorSubject<EngineModel[]> = new BehaviorSubject([]);
  private host: string = environment.host;

  constructor(private http: Http,
              private authService: AuthService,
              private router: Router,
              private msgService: MsgService) {
  }

  public all(resync = false): Observable<EngineModel[]> {
    if (resync) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const options = new RequestOptions({headers: headers, withCredentials: true});

      this.http.get(this.host + '/v1/engine-models', options)
        .subscribe((response: Response) => {
          const models = [];
          response.json().forEach(item => {
            models.push(Object.assign(new EngineModel(), item));
          });
          this.models.next(models);
        }, error => {
          this.models.next([]);
          Error.check(error, this.authService, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.json().message || 'Server error');
        });
    }
    return this.models.asObservable();
  }
}
