import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService) { }

    canActivate() {
        var admin = false;
        this.authService.isAdmin().subscribe(isAdmin => {
            if (isAdmin) {
                admin = true;
            }
        });

        if (admin)
        {
            return true;
        }

        return false;
    }
}