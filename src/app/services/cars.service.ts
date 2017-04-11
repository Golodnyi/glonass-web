import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {env} from "../../env";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Error} from "../models/Error";
import {Car} from "../models/Car";
import {TreeNode} from "primeng/primeng";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {MsgService} from "./msg";

@Injectable()
export class CarsService {
    private carsSubDivisionsCompanyUrl = '/v1/companies/:company/subdivisions/:subdivision/cars';
    private car: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(private http: Http, private authService: AuthService, private router: Router, private msgService: MsgService) {
    }

    public getCars(company, subdivision): Observable<Car[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(env.backend + this.carsSubDivisionsCompanyUrl.replace(':company', '1').replace(':subdivision', '1'), options)
            .map((response: Response) => {
                return response.json()
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    public getCarsAsTree(company, subdivision, leaf: boolean = false, selectable: boolean = false): Observable<TreeNode[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({headers: headers, withCredentials: true});

        var cars: Car[];
        var items = [];

        return this.http.get(env.backend + this.carsSubDivisionsCompanyUrl.replace(':company', String(company)).replace(':subdivision', String(subdivision)), options)
            .map((response: Response) => {
                cars = response.json();
                cars.forEach(function (item) {
                    items.push(
                        {
                            "label": item.name,
                            "type": "car",
                            "data": item.id,
                            "expandedIcon": "fa-folder-open",
                            "collapsedIcon": "fa-folder",
                            "leaf": leaf,
                            "selectable": selectable
                        }
                    );
                });

                return items;
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    public setCar(car: number): void {
        this.car.next(car);
    }

    public getCar(): Observable<number> {
        return this.car.asObservable();
    }
}
