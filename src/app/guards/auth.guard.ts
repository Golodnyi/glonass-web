import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    /**
     * TODO: переписать говнокод
     * @returns {boolean}
     */
    canActivate() {
        let auth = false;
        this.authService.isLoggedIn().subscribe(loggedIn => {
            if (loggedIn) {
                auth = true;
            }
        });

        if (auth) {
            return true;
        }

        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
    }
}
