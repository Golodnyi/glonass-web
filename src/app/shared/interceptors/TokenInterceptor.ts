import { JwtHelperService } from '@auth0/angular-jwt';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';

export class TokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authService: AuthService) {}

  private addAuthenticationToken(req: HttpRequest<any>) {
    console.log('addAuthenticationToken');
    const token = localStorage.getItem('Authorization') || null;

    this.refreshTokenSubject.next(token);
    return req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + token
        }
      });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Authorization');
    console.log('intercept');
    if (!token) {
      console.log('empty token');
      return next.handle(req);
    }

    const jwtHelper = new JwtHelperService();

    if (!jwtHelper.isTokenExpired(token)) {
      console.log('valid token');
      req = this.addAuthenticationToken(req);
      return next.handle(req);
    }

    if (this.refreshTokenInProgress) {
      console.log('token already update in progress');
      if (req.url.indexOf('v1/auth/refresh') !== -1) {
        console.log('found url for update token');
        return next.handle(this.addAuthenticationToken(req));
      }
      return this.refreshTokenSubject
        .filter(result => result !== null)
        .take(1)
        .switchMap((result: any) => {
          console.log('refreshTokenSubject return new token');
          return next.handle(this.addAuthenticationToken(req));
        });
    } else {
      console.log('update token now');

      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);
      return this.authService
        .refreshToken()
        .switchMap(() => {
          console.log('service return token');
          this.refreshTokenInProgress = false;
          return next.handle(this.addAuthenticationToken(req));
        })
        .catch((err: any) => {
          this.refreshTokenInProgress = false;
          this.authService.logout();
          console.log(err);
          return next.handle(this.addAuthenticationToken(req));
        });
    }
  }
}
