import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private cookieService:CookieService, private authService: AuthService) { }

    canActivate() {
        if (localStorage.getItem('user')  && this.cookieService.get('token')) {
            return true;
        }

        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
    }
}