import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/User";
import {Auth} from "../../../models/Auth";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    private auth: Auth;
    private error = '';

    constructor(private router: Router, private authService: AuthService) {
        this.auth = {email: 'demo@demo.ru', password: 'demo', remember: 0};
    }

    ngOnInit() {

    }

    login() {
        this.authService.login(this.auth).subscribe(res => {
            if (res)
            {
                this.router.navigate(['/dashboard']);
            }
            else {
                this.error = 'Username or password is incorrect';
            }
        });
    }
}
