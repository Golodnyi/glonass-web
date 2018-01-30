import {Component} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {MsgService} from '../shared/services/msg';

@Component({
    selector   : 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls  : ['./logout.component.css']
})
export class LogoutComponent {

    constructor(private authService: AuthService,
                private msgService: MsgService) {
        this.authService.logout().subscribe(
            logout => {
                if (logout === false) {
                    this.msgService.notice(MsgService.ERROR, 'Ошибка',
                        'Не удалось выйти из системы, попробуйте позже.');
                }
            },
            error => {
                this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
            }
        );
    }
}
