import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MsgService } from '../../../shared/services/msg';
import { Car } from '../../../shared/models/car.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../../shared/services/error.service';

@Injectable()
export class MonitoringService {
    private host: string = environment.host;

    constructor(private http: HttpClient,
                private router: Router,
                private msgService: MsgService,
                private errorService: ErrorService) {
    }

    public status(car: Car): Observable<any> {
        return this.http.get(
            this.host + '/v1/cars/' + car.id + '/sensors/status')
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return Observable.throw(error.error.message || 'Server error');
            });
    }
}
