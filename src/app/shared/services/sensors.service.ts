import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable()
export class SensorsService {
    private sensors: Subject<any[]> = new Subject();
    private host: string            = environment.host;

    constructor(private http: HttpClient,
                private errorService: ErrorService) {
    }

    public all(car: number, resync = false): Observable<any> {
        if (resync) {
            this.http.get(this.host + '/v1/cars/' + car + '/sensors')
                .subscribe((response: any) => {
                    this.sensors.next(response);
                }, error => {
                    this.errorService.check(error);
                });
        }
        return this.sensors.asObservable();
    }
}
