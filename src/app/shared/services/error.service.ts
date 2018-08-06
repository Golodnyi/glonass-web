import { Injectable } from '@angular/core';


import { Router } from '@angular/router';
import { MsgService } from '../services/msg';
import { TranslateService } from '@ngx-translate/core';
import { Error } from '../models/error.model';
import { KeysPipe } from '../pipes/keys.pipe';

@Injectable()
export class ErrorService {
    constructor(
        private router: Router,
        private msgService: MsgService,
        private translate: TranslateService,
        private keysPipe: KeysPipe) {
    }

    public check(error: any) {
        if (error.status !== 200 && error.status !== 304 && error.status !== 0) {
            const e: Error = Object.assign(new Error(), error.error);

            this.keysPipe.transform(e.sources).forEach(
                key => {
                    this.translate.get(e.sources[key]).subscribe(
                        msg => {
                            e.params[key] = msg;
                        }
                    );
                }
            );

            this.translate.get(e.message, e.params).subscribe(
                msg => {
                    this.msgService.notice(MsgService.ERROR, error.status, msg || 'Server Error');
                }
            );

            if (error.status === 401) {
                localStorage.removeItem('Authorization');
                localStorage.removeItem('Refresh');
                localStorage.removeItem('User');
                this.router.navigate(['/login']);
            }
        }
    }

}
