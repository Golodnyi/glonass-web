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
      return next.handle(req);
    }

    const jwtHelper = new JwtHelperService();

    if (!jwtHelper.isTokenExpired(token)) {
      req = this.addAuthenticationToken(req);
      return next.handle(req);
    }

    if (this.refreshTokenInProgress) {
      return this.refreshTokenSubject
        .filter(result => result !== null)
        .take(1)
        .switchMap((result: any) => {
          return next.handle(this.addAuthenticationToken(req));
        });
    } else {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);
      return this.authService
        .refreshToken()
        .switchMap(() => {
          this.refreshTokenInProgress = false;
          return next.handle(this.addAuthenticationToken(req));
        })
        .catch((err: any) => {
          this.refreshTokenInProgress = false;
          this.authService.logout();
          return Observable.throw(err);
        });
    }
  }
}
