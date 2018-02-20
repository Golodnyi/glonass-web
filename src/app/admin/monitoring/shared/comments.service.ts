import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Comment} from './comment.model';
import {Error} from '../../../shared/models/error.model';
import {MsgService} from '../../../shared/services/msg';
import {environment} from '../../../../environments/environment';

@Injectable()
export class CommentsService {
    private host: string                 = environment.host;

    constructor(private http: HttpClient,
                private router: Router,
                private msgService: MsgService) {
    }

    public all(car: number): Observable<Comment[]> {
        return this.http.get(this.host + '/v1/cars/' + car + '/comments')
            .map((response: any) => {
                return response;
            }).catch((error: any) => {
                Error.check(error, this.router, this.msgService);
                return Observable.throw(error.error.message || 'Server error');
            });
    }

    public create(car: number): Observable<Comment> {
        const comment = '';
        return this.http.post(this.host + '/v1/cars/' + car + '/comments', comment)
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                Error.check(error, this.router, this.msgService);
                return Observable.throw(error.error.message || 'Server error');
            });
    }
}
