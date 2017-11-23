import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';

@Injectable()
export class GuestGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate() {
    return !this.authService.isLoggedIn();
  }
}
