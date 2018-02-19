import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {Error} from '../models/error.model';
import {Car} from '../models/car.model';
import {MsgService} from './msg';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {State} from '../../dashboard/state/shared/state.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CommentsService {
    private cars: BehaviorSubject<Car[]> = new BehaviorSubject([]);
    private car: BehaviorSubject<Car>    = new BehaviorSubject(new Car());
    private host: string                 = environment.host;

    constructor(private http: HttpClient,
                private router: Router,
                private msgService: MsgService) {
    }

    public all(car: Car): Observable<any[]> {
        return this.http.get(this.host + '/v1/cars/' + car.id + '/comments')
            .map((response: any) => {
                return response;
            }).catch((error: any) => {
                Error.check(error, this.router, this.msgService);
                return Observable.throw(error.error.message || 'Server error');
            });
    }

    public create(car: Car): Observable<Car> {
        comment = '';
        return this.http.post(this.host + '/v1/cars/' + car.id + '/comments', comment)
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                Error.check(error, this.router, this.msgService);
                return Observable.throw(error.error.message || 'Server error');
            });
    }
}
