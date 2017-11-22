import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Error} from '../models/error.model';
import {Subdivision} from '../models/subdivision.model';
import {MsgService} from './msg';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SubdivisionsService {
  private subdivisions: BehaviorSubject<Subdivision[]> = new BehaviorSubject([]);
  private subdivision: BehaviorSubject<Subdivision> = new BehaviorSubject(new Subdivision());
  private host: string = environment.host;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router,
              private msgService: MsgService) {
  }

  public all(company: number, resync = false): Observable<Subdivision[]> {
    if (resync) {
      this.http.get(this.host + '/v1/companies/' + company + '/subdivisions')
        .subscribe((response: any) => {
          const subdivisions = [];
          response.forEach(item => {
            subdivisions.push(Object.assign(new Subdivision(), item));
          });
          this.subdivisions.next(subdivisions);
        }, error => {
          this.subdivisions.next([]);
          Error.check(error, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.statusText || 'Server error');
        });
    }
    return this.subdivisions.asObservable();
  }

  public all_resync(company: number): Observable<Subdivision[]> {
    return this.http.get(this.host + '/v1/companies/' + company + '/subdivisions')
      .map((response: any) => {
        const subdivisions = [];
        response.forEach(item => {
          subdivisions.push(Object.assign(new Subdivision(), item));
        });
        return subdivisions;
      }).catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public create(subdivision: Subdivision): Observable<Subdivision> {
    return this.http.post(this.host + '/v1/companies/' + subdivision.company_id + '/subdivisions', subdivision)
      .map((response: any) => {
        const subdivisionObj: Subdivision = Object.assign(new Subdivision(), response);
        const list = [];
        this.subdivisions.getValue().forEach(c => {
          list.push(Object.assign(new Subdivision(), c));
        });
        list.push(Object.assign(new Subdivision(), subdivisionObj));
        this.subdivisions.next(list);
        return subdivisionObj;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public get(company: number, subdivision: number, resync = false): Observable<Subdivision> {
    if (resync) {
      this.http.get(
        this.host + '/v1/companies/' + company + '/subdivisions/' + subdivision)
        .subscribe((response: any) => {
          this.subdivision.next(Object.assign(new Subdivision(), response));
        }, error => {
          this.subdivision.next(new Subdivision());
          Error.check(error, this.router, this.msgService);
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error.statusText || 'Server error');
        });
    }
    return this.subdivision.asObservable();
  }

  public update(subdivision: Subdivision): Observable<Subdivision> {
    return this.http.put(this.host + '/v1/companies/' + subdivision.company_id + '/subdivisions/' + subdivision.id, subdivision)
      .map((response: any) => {
        const subdivisionObj: Subdivision = Object.assign(new Subdivision(), response);
        this.subdivision.next(subdivisionObj);
        this.subdivisions.next(
          this.subdivisions.getValue().map(subdivisionFilter => {
            if (subdivisionFilter.id === subdivisionObj.id) {
              subdivisionFilter = subdivisionObj;
            }
            return subdivisionFilter;
          }));
        return subdivisionObj;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }

  public delete(subdivision: Subdivision): Observable<boolean> {
    return this.http.delete(this.host + '/v1/companies/1/subdivisions/' + subdivision.id)
      .map((response: any) => {
        this.msgService.notice(MsgService.SUCCESS, 'Удалена', response.message);
        const list = [];
        this.subdivisions.getValue().forEach(c => {
          if (subdivision.id !== c.id) {
            list.push(Object.assign(new Subdivision(), c));
          }
        });
        this.subdivisions.next(list);
        return true;
      })
      .catch((error: any) => {
        Error.check(error, this.router, this.msgService);
        return Observable.throw(error.statusText || 'Server error');
      });
  }
}
