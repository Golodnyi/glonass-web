import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EngineModel } from '../models/engine-model.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable()
export class EngineModelsService {
    private models: BehaviorSubject<EngineModel[]> = new BehaviorSubject([]);
    private host: string                           = environment.host;

    constructor(private http: HttpClient,
                private errorService: ErrorService) {
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
                    this.errorService.check(error);
                });
        }
        return this.models.asObservable();
    }

    public get(engineModelId: number): Observable<EngineModel> {
        return this.http.get(this.host + '/v1/engine-models/' + engineModelId)
            .map((response: any) => {
                return Object.assign(new EngineModel(), response);
            }, error => {
                this.errorService.check(error);
            });
    }
}
