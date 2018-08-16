import { Car } from 'app/shared/models/car.model';
import { ErrorService } from './../../../shared/services/error.service';
import { environment } from './../../../../environments/environment';

import {throwError as observableThrowError, Observable  } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoadMapService {
    private host: string = environment.host;

    constructor(
        private http: HttpClient,
        private errorService: ErrorService) {
    }

    public get(subdivision: number): Observable<any> {
        return this.http.get(this.host + '/v1/subdivisions/' + subdivision + '/roadmap')
            .map((response: any) => {
                return response;
            }).catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }

    public car(car: Car) {
        return this.http.get(this.host + '/v1/cars/' + car.id + '/location')
            .map((response: any) => {
                return response;
            }).catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }
}
