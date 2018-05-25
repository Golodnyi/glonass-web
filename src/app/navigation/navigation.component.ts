import { Component, OnDestroy } from '@angular/core';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
    public user: User;
    public langAliases = {
        'ru': 'Русский',
        'en': 'English',
        'cn': 'Chinese'
    };

    constructor(private authService: AuthService, public router: Router, public translate: TranslateService) {
        this.setLanguage();

        this.router.events.filter((e: any) => {
            return e instanceof NavigationEnd;
        }).subscribe((e) => {
            this.user = this.authService.getCurrentUser();
        });
    }

    public isAdmin(): boolean {
        return this.authService.isAdmin();
    }

    public changeLanguage(lang) {
        localStorage.setItem('language', lang);
        this.translate.use(lang);
    }

    private setLanguage() {
        this.translate.addLangs(['en', 'ru', 'cn']);
        this.translate.setDefaultLang('ru');
        // const browserLang = this.translate.getBrowserLang();
        if (localStorage.getItem('language') && localStorage.getItem('language').match(/en|ru|cn/)) {
            this.translate.use(localStorage.getItem('language'));
        } else {
            this.translate.use('ru');
        }
        /** else if (browserLang.match(/en|ru|cn/)) {
            this.translate.use(browserLang);
        } else {
            this.translate.use('ru');
        } **/
    }
}
