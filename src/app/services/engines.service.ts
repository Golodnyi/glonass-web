import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {env} from '../../env';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Error} from '../models/Error';
import {TreeNode} from 'primeng/primeng';
import {MsgService} from './msg';
import {Engine} from '../models/Engine';

@Injectable()
export class EnginesService {
    private engineByCarUrl = '/v1/companies/:company/subdivisions/:subdivision/cars/:car/engine';

    constructor(private http: Http, private authService: AuthService, private router: Router, private msgService: MsgService) {
    }

    public getEngine(company, subdivision, car): Observable<Engine> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(env.backend + this.engineByCarUrl
                .replace(':company', String(company))
                .replace(':subdivision', String(subdivision))
                .replace(':car', String(car)), options)
            .map((response: Response) => {
                const engine: Engine = Object.assign(new Object(), response.json());
                return engine;
            })
            .catch((error: any) => {
                Error.check(error, this.authService, this.router, this.msgService);
                return Observable.throw(error.json().message || 'Server error');
            });
    }

    public getEngineAsTree(company, subdivision, car, leaf = false, selectable = false): Observable<TreeNode[]> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({headers: headers, withCredentials: true});

        return this.http.get(env.backend + this.engineByCarUrl
                .replace(':company', String(company))
                .replace(':subdivision', String(subdivision))
                .replace(':car', String(car)), options)
            .map((response: Response) => {
                let engine: Engine;
                engine = response.json();
                if (engine.id) {
                    const item: TreeNode[] = [{
                        'label': String(engine.esn),
                        'type': 'engine',
                        'data': engine.id,
                        'expandedIcon': 'fa-folder-open',
                        'collapsedIcon': 'fa-folder',
                        'leaf': leaf,
                        'selectable': selectable
                    }];
                    return item;
                }

                return [];
            });
    }
}
