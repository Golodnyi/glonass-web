import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MsgService } from '../../../shared/services/msg';
import { Car } from '../../../shared/models/car.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../../shared/services/error.service';

@Injectable()
export class ResetService {
    private host: string = environment.host;

    constructor(private http: HttpClient,
                private router: Router,
                private msgService: MsgService,
                private errorService: ErrorService) {
    }

    public reset(data: any): Observable<any> {
        return this.http.post(
            this.host + '/v1/engine-maintenances/scheduled', data)
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return Observable.throw(error.error.message || 'Server error');
            });
    }

    public resetGaranted(data: any): Observable<any> {
        return this.http.post(
            this.host + '/v1/engine-maintenances/', data)
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return Observable.throw(error.error.message || 'Server error');
            });
    }

    public all(car: Car): Observable<any> {
        return this.http.get(
            this.host + '/v1/engine-maintenances/engine/' + car.engine.id + '/scheduled')
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return Observable.throw(error.error.message || 'Server error');
            });
    }

    public allGaranted(car: Car): Observable<any> {
        return this.http.get(
            this.host + '/v1/engine-maintenances/engine/' + car.engine.id)
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return Observable.throw(error.error.message || 'Server error');
            });
    }
}
