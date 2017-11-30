import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Scheme } from './scheme.model';

@Injectable()
export class SensorsService {
    private sensors: Subject<any[]> = new Subject();
    private host: string = environment.host;

    constructor(private http: HttpClient, private router: Router) {
    }

    public overallScheme(car_id: Car): Observable<Scheme> {
        return this.http.get(this.host + '/v1/cars/' + car_id + '/overall-scheme')
            .map((response: any) => {
                console.log(response);
                return response;
            }).catch((error: any) => {
                Error.check(error, this.router, this.msgService);
                return Observable.throw(error.statusText || 'Server error');
            });
    }
}
