import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { MsgService } from '../services/msg';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorService {
    constructor(private router: Router, private msgService: MsgService, private translate: TranslateService) {
    }

    public check(error: any) {
        if (error.status !== 200 && error.status !== 304 && error.status !== 0) {

            this.translate.get(error.error.message, error.error.params ? error.error.message : {}).subscribe(
                msg => {
                    this.msgService.notice(MsgService.ERROR, error.status, msg || 'Server Error');
                }
            );

            if (error.status === 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        }
    }

}
