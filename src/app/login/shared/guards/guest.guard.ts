import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable()
export class GuestGuard implements CanActivate {

  constructor() {
  }

  canActivate() {
    return !AuthService.isLoggedIn();
  }
}
