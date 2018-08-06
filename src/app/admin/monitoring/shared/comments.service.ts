
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { Comment } from './comment.model';
import { environment } from '../../../../environments/environment';
import { ErrorService } from '../../../shared/services/error.service';

@Injectable()
export class CommentsService {
    private host: string = environment.host;

    constructor(private http: HttpClient,
                private errorService: ErrorService) {
    }

    public all(car: number): Observable<Comment[]> {
        return this.http.get(this.host + '/v1/cars/' + car + '/comments')
            .map((response: any) => {
                return response;
            }).catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }

    public create(car: number, message: string): Observable<Comment> {
        return this.http.post(this.host + '/v1/cars/' + car + '/comments', {message: message})
            .map((response: any) => {
                return response;
            })
            .catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }
}
