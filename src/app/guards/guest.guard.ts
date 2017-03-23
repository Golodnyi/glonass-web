import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable()
export class GuestGuard implements CanActivate {

    constructor(private router: Router, private authService:AuthService) { }

    canActivate() {
        var guest = false;
        this.authService.isLoggedIn().subscribe(loggedIn => {
            if (!loggedIn) {
                guest = true;
            }
        });

        if (guest) {
            return true;
        }

        this.router.navigate(['/dashboard']);
        return false;
    }
}