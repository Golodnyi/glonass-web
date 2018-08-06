
import {throwError as observableThrowError,  Observable ,  BehaviorSubject ,  Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Filter } from '../models/filter.model';
import { AutoRefresh } from '../models/auto-refresh.model';
import { Sensor } from '../models/sensor.model';
import { Car } from '../models/car.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable()
export class ChartsService {
    private data: Subject<any>                        = new Subject();
    private car: BehaviorSubject<Car>                 = new BehaviorSubject(null);
    private filter: BehaviorSubject<Filter>           = new BehaviorSubject(new Filter());
    private sensors: BehaviorSubject<Sensor[]>        = new BehaviorSubject([]);
    private autoRefresh: BehaviorSubject<AutoRefresh> = new BehaviorSubject(new AutoRefresh());
    private host: string                              = environment.host;

    constructor(private http: HttpClient,
                private errorService: ErrorService) {
    }

    public setFilter(filter: Filter) {
        this.filter.next(filter);
    }

    public getFilter() {
        return this.filter.asObservable();
    }

    public setCar(car: Car) {
        this.car.next(car);
    }

    public getCar(): Observable<Car> {
        return this.car.asObservable();
    }

    public setAutoRefresh(autoRefresh: any) {
        this.autoRefresh.next(autoRefresh);
    }

    public getAutoRefresh() {
        return this.autoRefresh.asObservable();
    }

    public mapData(car: Car): Observable<any> {
        const filter = this.filter.getValue();
        let params   = '?';
        if (filter.enabled) {
            if (!filter.last) {
                params +=
                    'dateFrom=' + encodeURIComponent(filter.before) + '&dateTo=' + encodeURIComponent(filter.after) +
                    '&';
            }
        }
        return this.http.get(this.host + '/v1/cars/' + car.id + '/report/map' + params)
            .map((response: any) => {
                return response;
            }).catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }

    public resync(car: Car): void {
        if (car === null) {
            return;
        }
        const filter      = this.filter.getValue();
        const autoRefresh = this.autoRefresh.getValue();
        let params        = '?';
        if (filter.enabled) {
            if (!Array.isArray(filter.charts) && filter.charts !== undefined) {
                params += 'sensors[]=' + filter.charts + '&';
            } else if (Array.isArray(filter.charts)) {
                filter.charts.forEach(function (sensor) {
                    params += 'sensors[]=' + sensor + '&';
                });
            }
            if (!filter.last) {
                params +=
                    'dateFrom=' + encodeURIComponent(filter.before) + '&dateTo=' + encodeURIComponent(filter.after) +
                    '&';
            }
        }
        if (autoRefresh.enabled && ((filter.last && filter.enabled) || !filter.enabled)) {
            params += 'afterTime=' + autoRefresh.afterTime;
        }
        this.http.get(this.host + '/v1/cars/' + car.id + '/report' + params)
            .subscribe((response: any) => {
                this.data.next(response.data);
                this.sensors.next(response.allowedSensors);
            }, error => {
                this.errorService.check(error);
            });
    }

    public get(): Observable<any> {
        return this.data.asObservable();
    }

    public getSensors(): Observable<any> {
        return this.sensors.asObservable();
    }

    public getTable(car: number, _params = [], page: number, sort = 'time', dir = 'desc'): Observable<any> {
        const filter = this.filter.getValue();
        let params   = '?page=' + (page + 1) + '&';
        if (filter.enabled) {
            if (!Array.isArray(filter.charts) && filter.charts !== undefined) {
                params += 'sensors[]=' + filter.charts + '&';
            } else if (Array.isArray(filter.charts)) {
                filter.charts.forEach(function (sensor) {
                    params += 'sensors[]=' + sensor + '&';
                });
            }
            if (!filter.last) {
                params +=
                    'dateFrom=' + encodeURIComponent(filter.before) + '&dateTo=' + encodeURIComponent(filter.after) +
                    '&';
            }
        }

        _params.forEach(p => {
            if (p === 'drive') {
                params += 'drive=1&';
            } else if (p === 'mv') {
                params += 'explained=1&';
            } else if (p === 'nv') {
                params += 'withEmptyValues=1&';
            }
        });

        params += 'sort=' + sort + '&sortDirection=' + dir;
        return this.http.get(this.host + '/v1/cars/' + car + '/report/table' + params)
            .map((response: any) => {
                return response;
            }).catch((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            });
    }

    public thermocouples(car: Car, lastDate: number): Observable<any> {
        let afterTime = '';

        if (lastDate) {
            afterTime = '?afterTime=' + lastDate;
        }

        return this.http.get(this.host + '/v1/cars/' + car.id + '/report/thermocouples' + afterTime)
            .map((response: any) => {
                return response;
            }, error => {
                this.errorService.check(error);
            });
    }

    public thermocouplesTable(car: number, page: number): Observable<any> {
        return this.http.get(this.host + '/v1/cars/' + car + '/report/thermocouples/table?page=' + (page + 1))
            .map((response: any) => {
                return response;
            }, error => {
                this.errorService.check(error);
            });
    }
}
