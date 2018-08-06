
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';


import { Router } from '@angular/router';
import { MsgService } from '../../../../shared/services/msg';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../../../shared/services/error.service';

@Injectable()
export class StateService {
    private host: string = environment.host;

    constructor(private http: HttpClient,
                private router: Router,
                private msgService: MsgService,
                private errorService: ErrorService) {
    }

    public getMonitor(warning: boolean): Observable<any> {
        if (warning) {
            return this.http.get(this.host + '/v1/cars/monitor/warnings')
                .map((response: any) => {
                    return response;
                }).catch((error: any) => {
                    this.errorService.check(error);
                    return observableThrowError(error.error.message || 'Server error');
                });
        }

        return this.http.get(this.host + '/v1/cars/monitor')
            .map((response: any) => {
                return response;
            }).catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }
}
