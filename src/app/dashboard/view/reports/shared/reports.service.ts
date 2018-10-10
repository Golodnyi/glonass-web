
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MsgService } from '../../../../shared/services/msg';
import { ErrorService } from '../../../../shared/services/error.service';
import { Car } from '../../../../shared/models/car.model';

@Injectable()
export class ReportsService {
    private host: string = environment.host;

    constructor(private http: HttpClient,
                private router: Router,
                private msgService: MsgService,
                private errorService: ErrorService) {
    }

    public get(car: Car): Observable<any> {
        return this.http.get(
            this.host + '/v1/cars/' + car.id + '/report/pdf')
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }
}
