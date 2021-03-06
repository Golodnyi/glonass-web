
import { catchError, map } from 'rxjs/operators';

import { throwError as observableThrowError,  Observable ,  BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


import { Engine } from '../models/engine.model';
import { environment } from '../../../environments/environment';
import { NewEngine } from '../../admin/companies/engine/shared/newEngine.model';
import { BaseEngine } from '../models/baseEngine.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable()
export class EnginesService {
    private engine: BehaviorSubject<Engine> = new BehaviorSubject(new Engine());
    private host: string                    = environment.host;

    constructor(private http: HttpClient,
                private errorService: ErrorService) {
    }

    public get(company: number, subdivision: number, car: number, resync = false): Observable<any> {
        if (resync) {
            this.http.get(
                this.host + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars/' + car + '/engine')
                .subscribe((response: any) => {
                    this.engine.next(Object.assign(new Engine(), response));
                }, error => {
                    this.engine.next(new Engine());
                    this.errorService.check(error);
                });
        }
        return this.engine.asObservable();
    }

    public getBase(company: number, subdivision: number, car: number): Observable<BaseEngine> {
        return this.http.get(
            this.host + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars/' + car + '/engine').pipe(
            map((response: any) => {
                return Object.assign(new BaseEngine(), response);
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }

    public getSync(company: number, subdivision: number, car: number): Observable<Engine> {
        return this.http.get(
            this.host + '/v1/companies/' + company + '/subdivisions/' + subdivision + '/cars/' + car + '/engine').pipe(
            map((response: any) => {
                return Object.assign(new Engine(), response);
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }

    public create(newEngine: NewEngine): Observable<BaseEngine> {
        return this.http.post(this.host + '/v1/engines', newEngine).pipe(
            map((response: any) => {
                return Object.assign(new BaseEngine(), response);
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }

    public update(newEngine: NewEngine): Observable<BaseEngine> {
        return this.http.put(this.host + '/v1/engines/' + newEngine.engine.id, newEngine).pipe(
            map((response: any) => {
                return Object.assign(new BaseEngine(), response);
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }
}
