import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {Error} from '../models/error.model';
import {MsgService} from './msg';
import {Engine} from '../models/engine.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../../environments/environment';
import {NewEngine} from '../../admin/companies/engine/shared/newEngine.model';
import {BaseEngine} from '../models/baseEngine.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EnginesService {
    private engine: BehaviorSubject<Engine> = new BehaviorSubject(new Engine());
    private host: string                    = environment.host;

    constructor(private http: HttpClient,
                private router: Router,
                private msgService: MsgService) {
    }

    public get(company: number, subdivision: number, car: number, resync = false): Observable<any> {
        if (resync) {
            this.http.get(
                this.host + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars/' + car + '/engine')
                .subscribe((response: any) => {
                    this.engine.next(Object.assign(new Engine(), response));
                }, error => {
                    this.engine.next(new Engine());
                    Error.check(error, this.router, this.msgService);
                    this.msgService.notice(MsgService.ERROR, 'Ошибка', error.error.message || 'Server error');
                });
        }
        return this.engine.asObservable();
    }

    public getBase(company: number, subdivision: number, car: number): Observable<BaseEngine> {
        return this.http.get(
            this.host + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars/' + car + '/engine')
            .map((response: any) => {
                return Object.assign(new BaseEngine(), response);
            })
            .catch((error: any) => {
                Error.check(error, this.router, this.msgService);
                return Observable.throw(error.error.message || 'Server error');
            });
    }

    public create(newEngine: NewEngine): Observable<BaseEngine> {
        return this.http.post(this.host + '/v1/engines', newEngine)
            .map((response: any) => {
                return Object.assign(new BaseEngine(), response);
            })
            .catch((error: any) => {
                Error.check(error, this.router, this.msgService);
                return Observable.throw(error.error.message || 'Server error');
            });
    }

    public update(newEngine: NewEngine): Observable<BaseEngine> {
        return this.http.put(this.host + '/v1/engines/' + newEngine.engine.id, newEngine)
            .map((response: any) => {
                return Object.assign(new BaseEngine(), response);
            })
            .catch((error: any) => {
                Error.check(error, this.router, this.msgService);
                return Observable.throw(error.error.message || 'Server error');
            });
    }
}
