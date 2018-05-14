import { Component } from '@angular/core';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
        this.router.events.filter((e: any) => {
            return e instanceof NavigationStart;
        }).subscribe(() => {
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
}
