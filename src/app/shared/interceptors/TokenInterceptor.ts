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
    const token = localStorage.getItem('Authorization') || '';
    console.log('Call addAuthenticationToken, token: ' + token);

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

    if (!token) {
      console.log('empty token, continue without token');
      return next.handle(req);
    }

    console.log('Run intercept, token: ' + token);
    const jwtHelper = new JwtHelperService();

    if (!jwtHelper.isTokenExpired(token)) {
      console.log('Token not expired, continue work...');
      req = this.addAuthenticationToken(req);
      return next.handle(req);
    }

    if (this.refreshTokenInProgress) {
      console.log('Token already in refresh progress');
      return this.refreshTokenSubject
        .filter(result => result !== null)
        .take(1)
        .switchMap((result: any) => {
          console.log('Refresh complite, token: ' + result);
          return next.handle(this.addAuthenticationToken(req));
        });
    } else {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);
      console.log('Token expired, send refresh request');
      return this.authService
        .refreshToken()
        .switchMap(() => {
          this.refreshTokenInProgress = false;
          console.log('Refresh compite with service');
          return next.handle(this.addAuthenticationToken(req));
        })
        .catch((err: any) => {
          this.refreshTokenInProgress = false;
          console.log('Error refresh token from service ' + err);
          this.authService.logout();
          return Observable.throw(err);
        });
    }
  }
}
