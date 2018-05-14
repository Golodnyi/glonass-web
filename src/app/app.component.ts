import {Component} from '@angular/core';
import {MsgService} from './shared/services/msg';
import {Message} from 'primeng/primeng';
import {User} from './shared/models/user.model';
import {AuthService} from './shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector   : 'app-run',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.css']
})
export class AppComponent {
    public growl: Message[] = [];
    public user: User;

    constructor(private msgService: MsgService, private authService: AuthService, public translate: TranslateService) {
        translate.addLangs(['en', 'ru', 'cn']);
        translate.setDefaultLang('ru');
        const browserLang = translate.getBrowserLang();
        if (localStorage.getItem('language') && localStorage.getItem('language').match(/en|ru|cn/)) {
            translate.use(localStorage.getItem('language'));
        } else if (browserLang.match(/en|ru|cn/)) {
            translate.use(browserLang);
        } else {
            translate.use('ru');
        }

        this.user = this.authService.getCurrentUser();

        this.msgService.getNotice().subscribe(
            notice => {
                this.growl = [];
                this.growl.push(notice);
            }
        );
    }
}
