import {Component} from '@angular/core';
import {User} from '../shared/models/user.model';
import {AuthService} from '../shared/services/auth.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
    selector   : 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls  : ['./navigation.component.css']
})
export class NavigationComponent {
    public user: User;

    constructor(private authService: AuthService, private router: Router) {
        this.router.events.filter((e: any) => {
            return e instanceof NavigationStart;
        }).subscribe(() => {
            this.user = this.authService.getCurrentUser();
        });
    }
}
