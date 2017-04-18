import {Component, OnInit} from '@angular/core';
import {User} from './models/User';
import {AuthService} from './services/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    public user: User;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.getCurrentUser().subscribe(user => {
            this.user = user;
        });
    }

    logout() {
        this.authService.logout();
    }
}