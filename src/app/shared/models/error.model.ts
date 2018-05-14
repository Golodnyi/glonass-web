import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { MsgService } from '../services/msg';

@Injectable()
export class Error {
    static check(error: any, router: Router, msgService: MsgService) {
        if (error.status !== 200 && error.status !== 304 && error.status !== 0) {
            msgService.notice(MsgService.ERROR, error.status, error.error.message || 'Server Error');

            if (error.status === 401) {
                localStorage.clear();
                router.navigate(['/login']);
            }
        }
    }
}
