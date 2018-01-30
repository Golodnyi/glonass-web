import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {Error} from '../models/error.model';
import {MsgService} from './msg';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../../environments/environment';
import {EngineModel} from '../models/engine-model.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EngineModelsService {
    private models: BehaviorSubject<EngineModel[]> = new BehaviorSubject([]);
    private host: string                           = environment.host;

    constructor(private http: HttpClient,
                private router: Router,
                private msgService: MsgService) {
    }

    public all(resync = false): Observable<EngineModel[]> {
        if (resync) {
            this.http.get(this.host + '/v1/engine-models')
                .subscribe((response: any) => {
                    const models = [];
                    response.forEach(item => {
                        models.push(Object.assign(new EngineModel(), item));
                    });
                    this.models.next(models);
                }, error => {
                    this.models.next([]);
                    Error.check(error, this.router, this.msgService);
                    this.msgService.notice(MsgService.ERROR, 'Ошибка', error.error.message || 'Server error');
                });
        }
        return this.models.asObservable();
    }

    public get(engineModelId: number): Observable<EngineModel> {
        return this.http.get(this.host + '/v1/engine-models/' + engineModelId)
            .map((response: any) => {
                return Object.assign(new EngineModel(), response);
            }, error => {
                Error.check(error, this.router, this.msgService);
                this.msgService.notice(MsgService.ERROR, 'Ошибка', error.error.message || 'Server error');
            });
    }
}
