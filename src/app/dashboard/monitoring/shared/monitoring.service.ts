import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {MsgService} from '../../../shared/services/msg';
import {Error} from '../../../shared/models/error.model';
import {Car} from '../../../shared/models/car.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MonitoringService {
    private host: string = environment.host;

    constructor(private http: HttpClient,
                private router: Router,
                private msgService: MsgService) {
    }

    public status(car: Car): Observable<any> {
        return this.http.get(
            this.host + '/v1/cars/' + car.id + '/sensors/status')
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                Error.check(error, this.router, this.msgService);
                return Observable.throw(error.error.message || 'Server error');
            });
    }
}
