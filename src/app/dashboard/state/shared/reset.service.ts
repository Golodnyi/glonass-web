
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Car } from '../../../shared/models/car.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../../shared/services/error.service';

@Injectable()
export class ResetService {
    private host: string = environment.host;

    constructor(private http: HttpClient,
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
                return observableThrowError(error.error.message || 'Server error');
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
                return observableThrowError(error.error.message || 'Server error');
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
                return observableThrowError(error.error.message || 'Server error');
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
                return observableThrowError(error.error.message || 'Server error');
            });
    }
}
