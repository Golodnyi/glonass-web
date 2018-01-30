import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Auth} from '../../login/shared/models/auth.model';
import {MsgService} from './msg';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtHelper} from 'angular2-jwt';
import {UsersService} from './users.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

@Injectable()
export class AuthService {
    private host: string = environment.host;
    private timer        = TimerObservable.create(0, 600000);
    private subscriptionRefreshToken: Subscription;

    public static isLoggedIn(): boolean {
        return !!localStorage.getItem('Authorization');
    };

    constructor(private http: HttpClient,
                private usersService: UsersService,
                private router: Router,
                private msg: MsgService) {
        AuthService.isLoggedIn();
    }

    public login(auth: Auth): Observable<boolean> {
        return this.http.post(this.host + '/v1/auth/login', auth).map(
            (data: any) => {
                const jwtHelper: JwtHelper = new JwtHelper();
                const token: any           = jwtHelper.decodeToken(data.accessToken);

                if (!token) {
                    return false;
                }

                if (jwtHelper.isTokenExpired(data.accessToken)) {
                    return false;
                }

                localStorage.setItem('Authorization', data.accessToken);
                localStorage.setItem('Refresh', data.refreshToken);

                this.usersService.current().subscribe(
                    (payload: any) => {
                        const user: User = Object.assign(new User(), payload.user);
                        user.role        = payload.role;
                        localStorage.setItem('User', JSON.stringify(user));

                        if (!user.company_id) {
                            this.router.navigate(['/dashboard']);
                        } else {
                            this.router.navigate(['/dashboard/company/' + user.company_id]);
                        }
                    },
                    error => {
                        localStorage.clear();
                        this.msg.notice(MsgService.ERROR, 'Ошибка получения пользователя', error);
                    }
                );
            })
            .catch((error: any) => {
                return Observable.throw(error.error.message || 'Server error');
            });
    }

    public refreshToken(): Observable<boolean> {
        return this.http.post(this.host + '/v1/auth/refresh', {refreshToken: localStorage.getItem('Refresh')}).map(
            (data: any) => {
                const jwtHelper: JwtHelper = new JwtHelper();
                const token: any           = jwtHelper.decodeToken(data.accessToken);

                if (!token) {
                    return false;
                }

                if (jwtHelper.isTokenExpired(data.accessToken)) {
                    return false;
                }

                localStorage.setItem('Authorization', data.accessToken);
                localStorage.setItem('Refresh', data.refreshToken);
                return true;
            })
            .catch((error: any) => {
                return Observable.throw(error.error.message || 'Server error');
            });
    }

    public logout(): Observable<boolean> {
        return this.http.post(this.host + '/v1/auth/logout', {refreshToken: localStorage.getItem('Refresh')})
            .map(() => {
                localStorage.clear();
                this.router.navigate(['/']);
                return true;
            })
            .catch((error: any) => {
                return Observable.throw(error.error.message || 'Server error');
            });
    }

    public isAdmin(): boolean {
        const user: User = this.getCurrentUser();
        if (user && user.role) {
            return !!user.role.is_global;
        }

        return false;
    }

    public getCurrentUser(): any {
        const user          = localStorage.getItem('User');
        const authorization = localStorage.getItem('Authorization');
        const refresh       = localStorage.getItem('Refresh');

        if (!user || !authorization || !refresh) {
            localStorage.clear();
        } else if (user) {
            if (!this.subscriptionRefreshToken) {
                this.subscriptionRefreshToken = this.timer.subscribe(
                    () => {
                        this.refreshToken().subscribe();
                    }
                );
            }
            return JSON.parse(user);
        }

        return false;
    }
}
