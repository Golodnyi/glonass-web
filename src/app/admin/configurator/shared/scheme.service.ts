
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Scheme } from './scheme.model';
import { SchemeItem } from './schemeItem.model';
import { SchemePostItem } from './schemePostItem.model';
import { ErrorService } from '../../../shared/services/error.service';

@Injectable()
export class SchemeService {
    private host: string = environment.host;

    constructor(private http: HttpClient, private errorService: ErrorService) {
    }

    public overallScheme(car: number): Observable<Scheme> {
        return this.http.get(this.host + '/v1/cars/' + car + '/overall-scheme')
            .map((response: any) => {
                return response;
            }).catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }

    public allowedSensors(car: number): Observable<any[]> {
        return this.http.get(this.host + '/v1/cars/' + car + '/overall-scheme/allowed-sensors')
            .map((response: any) => {
                return response;
            }).catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }

    public allowedSensorModels(car: number, sensor: number): Observable<any[]> {
        return this.http.get(this.host + '/v1/cars/' + car + '/overall-scheme/allowed-sensors/' + sensor + '/models')
            .map((response: any) => {
                return response;
            }).catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }

    public updateOverallScheme(car: number, sensor: SchemeItem): Observable<any> {
        const data        = new SchemePostItem();
        data.id           = car;
        data.sensor_id    = sensor.id;
        data.sensor_model = sensor.model.id;
        data.port         = sensor.model.port;

        if (sensor.limits) {
            data.limits = sensor.limits;
        } else {
            delete data.limits;
        }

        return this.http.put(this.host + '/v1/cars/' + car + '/overall-scheme', data)
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }

    public createOverallScheme(car: number, sensor: SchemeItem): Observable<any> {
        const data        = new SchemePostItem();
        data.id           = car;
        data.sensor_id    = sensor.id;
        data.sensor_model = sensor.model.id;
        data.port         = sensor.model.port;

        if (sensor.limits) {
            data.limits = sensor.limits;
        } else {
            delete data.limits;
        }

        return this.http.post(this.host + '/v1/cars/' + car + '/overall-scheme', data)
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }
}
