import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {MsgService} from '../services/msg';

@Injectable()
export class Error {

    /**
     * TODO: переписать на статический метод или че нить такое
     * @param error
     * @param authService
     * @param router
     * @param msgService
     */
    constructor(private error: any, private authService: AuthService, private router: Router, private msgService: MsgService) {
        if (this.error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
        }else if (this.error.status === 500) {
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error.statusText);
        }
    }
}
