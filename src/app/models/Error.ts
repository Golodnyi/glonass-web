import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class Error {

    constructor(private error: any, private authService: AuthService, private router: Router) {
        if (this.error.status == 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
        }
    }


}
