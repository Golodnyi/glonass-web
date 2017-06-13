import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MsgService } from '../services/msg';

@Injectable()
export class Error {
  static check(error: any, authService: AuthService, router: Router, msgService: MsgService) {
    if (error.status === 401) {
      authService.localLogout();
    } else if (error.status === 500) {
      msgService.notice(MsgService.ERROR, 'Ошибка', error.statusText);
    }
  }
}
