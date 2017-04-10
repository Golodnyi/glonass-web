import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Auth} from "../../../models/Auth";
import {Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";
import {User} from "../../../models/User";
import {Message} from 'primeng/primeng';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    private auth: Auth;
    private user: User;
    private msgs: Message[] = [];

    constructor(private router: Router, private authService: AuthService, private usersService: UsersService) {
        this.auth = {email: 'demo@demo.ru', password: 'demo', remember: false};
    }

    ngOnInit() {

    }

    login() {
        this.authService.login(this.auth).subscribe(
            user => {
                this.user = user;
                this.usersService.getRole(user.role_id).subscribe(
                    role => {
                        this.user.role = role;
                        localStorage.setItem('user', JSON.stringify(this.user));
                        this.router.navigate(['/dashboard'])
                    },
                    error => {
                        this.msgs.push({severity: 'warn', summary: 'Ошибка', detail: error});
                    }
                );
            },
            error => {
                this.msgs.push({severity: 'error', summary: 'Ошибка', detail: error});
            }
        );
    }
}
