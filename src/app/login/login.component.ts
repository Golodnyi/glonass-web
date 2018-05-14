import {Component} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Auth} from './shared/models/auth.model';
import {User} from '../shared/models/user.model';
import {MsgService} from '../shared/services/msg';
import {FormGroup} from '@angular/forms';
import {AuthForm} from './shared/forms/auth.form';
import { Error } from '../shared/models/error.model';
import { Router } from '@angular/router';

@Component({
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.css'],
    providers  : [AuthForm]
})
export class LoginComponent {
    public submit     = false;
    public auth: Auth = new Auth();
    public user: User;
    public form: FormGroup;

    constructor(private authService: AuthService,
                private msgService: MsgService,
                private authForm: AuthForm,
                private router: Router) {
        this.form = this.authForm.create(this.auth);
        this.form.valueChanges.subscribe((data) => {
            this.auth = data;
        });
    }

    onSubmit() {
        this.submit = true;
        this.authService.login(this.auth).subscribe(
            () => {
                this.submit = false;
            },
            error => {
                localStorage.clear();
                Error.check(error, this.router, this.msgService);
                this.submit = false;
            }
        );
    }
}
