import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    public user: User;

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.isLoggedIn().subscribe(loggedIn => {
            this.user = null;
            
            if (loggedIn) {
                this.user = JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    subdivisions() {

    }
}
