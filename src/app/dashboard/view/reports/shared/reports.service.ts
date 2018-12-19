
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../../../shared/services/error.service';
import { Car } from '../../../../shared/models/car.model';
import { Report } from './report.model';

@Injectable()
export class ReportsService {
    private host: string = environment.host;

    constructor(private http: HttpClient,
                private errorService: ErrorService) {
    }

    public get(car: Car, report: Report): Observable<any> {

        const params = '?from=' + report.before + '&to=' + report.after;

        return this.http.get(
            this.host + '/v1/cars/' + car.id + '/report/pdf' + params)
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }
}
