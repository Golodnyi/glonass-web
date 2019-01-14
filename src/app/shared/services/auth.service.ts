
import { map, catchError } from 'rxjs/operators';

import { throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


import { Auth } from '../../login/shared/models/auth.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';

@Injectable()
export class AuthService {
    private authHost: string = environment.auth_host;

    public static destroyAuthizozationDate() {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('Refresh');
        localStorage.removeItem('User');
    }

    public static isLoggedIn(): boolean {
        return !!localStorage.getItem('Authorization');
    };

    constructor(private http: HttpClient,
        private usersService: UsersService,
        private router: Router,
        private errorService: ErrorService) {
    }

    public login(auth: Auth): Observable<boolean> {
        return this.http.post(this.authHost + '/v1/auth/login', auth).pipe(map(
            (data: any) => {
                const jwtHelper = new JwtHelperService();
                const token: any = jwtHelper.decodeToken(data.accessToken);

                if (!token) {
                    return false;
                }

                if (jwtHelper.isTokenExpired(data.accessToken)) {
                    return false;
                }

                localStorage.setItem('Authorization', data.accessToken);
                localStorage.setItem('Refresh', data.refreshToken);
                localStorage.setItem('User', JSON.stringify({}));

                this.usersService.current().subscribe(
                    (payload: any) => {
                        const user: User = Object.assign(new User(), payload.user);
                        user.role = payload.role;
                        localStorage.setItem('User', JSON.stringify(user));

                        if (!user.company_id) {
                            this.router.navigate(['/dashboard']);
                        } else {
                            this.router.navigate(['/dashboard/company/' + user.company_id]);
                        }
                    },
                    error => {
                        AuthService.destroyAuthizozationDate();
                    }
                );
            }),
            catchError((error: any) => {
                AuthService.destroyAuthizozationDate();
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }

    public refreshToken(): Observable<boolean> {
        return this.http.post(this.authHost + '/v1/auth/refresh', { refreshToken: localStorage.getItem('Refresh') }).pipe(map(
            (data: any) => {
                localStorage.setItem('Authorization', data.accessToken);
                localStorage.setItem('Refresh', data.refreshToken);
                return true;
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }

    public logout(): Observable<boolean> {
        return this.http.post(this.authHost + '/v1/auth/logout', { refreshToken: localStorage.getItem('Refresh') }).pipe(
            map(() => {
                AuthService.destroyAuthizozationDate();
                this.router.navigate(['/']);
                return true;
            }),
            catchError((error: any) => {
                this.errorService.check(error);
                return observableThrowError(error.error.message || 'Server error');
            }));
    }

    public isAdmin(): boolean {
        const user: User = this.getCurrentUser();
        if (user && user.role) {
            return !!Number(user.role.is_global);
        }

        return false;
    }

    public getCurrentUser(): any {
        const user = localStorage.getItem('User');
        const authorization = localStorage.getItem('Authorization');
        const refresh = localStorage.getItem('Refresh');

        if (!user || !authorization || !refresh) {
            AuthService.destroyAuthizozationDate();
            return false;
        }

        return JSON.parse(user);
    }
}
