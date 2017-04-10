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

@Injectable()
export class CarsService {
    private carsSubDivisionsCompanyUrl = '/v1/companies/:company/subdivisions/:subdivision/cars';

    constructor(private http: Http, private authService: AuthService, private router: Router) {
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
                new Error(error, this.authService, this.router);
                return Observable.throw(error.json().message || 'Server error')
            });
    }

    public getCarsAsTree(company, subdivision): Observable<TreeNode[]> {
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
                            "collapsedIcon": "fa-folder"
                        }
                    );
                });

                return items;
            })
            .catch((error: any) => {
                new Error(error, this.authService, this.router);
                return Observable.throw(error.json().message || 'Server error')
            });
    }
}
