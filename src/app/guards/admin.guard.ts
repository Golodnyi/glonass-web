import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService) {
    }

    /**
     * TODO: переписать говнокод
     * @returns {boolean}
     */
    canActivate() {
        let admin = false;
        this.authService.isAdmin().subscribe(isAdmin => {
            if (isAdmin) {
                admin = true;
            }
        });

        if (admin) {
            return true;
        }

        return false;
    }
}