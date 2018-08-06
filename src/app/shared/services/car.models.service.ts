import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { CarModel } from '../models/car-model.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable()
export class CarModelsService {
    private models: BehaviorSubject<CarModel[]> = new BehaviorSubject([]);
    private host: string                        = environment.host;

    constructor(private http: HttpClient,
                private errorService: ErrorService) {
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
                    this.errorService.check(error);
                });
        }
        return this.models.asObservable();
    }
}
