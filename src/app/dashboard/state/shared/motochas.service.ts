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
export class MotochasService {
    private host: string = environment.host;

    constructor(private http: HttpClient,
                private router: Router,
                private msgService: MsgService,
                private errorService: ErrorService) {
    }

    public get(car: Car, motochas: number): Observable<any> {
        return this.http.get(
            this.host + '/v1/machine-hours/find-date?car_id=' + car.id + '&term=' + motochas)
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return Observable.throw(error.error.message || 'Server error');
            });
    }
}
