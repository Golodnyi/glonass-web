import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private cookieService:CookieService) { }

    canActivate() {
        if (localStorage.getItem('user')  && this.cookieService.get('token')) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}