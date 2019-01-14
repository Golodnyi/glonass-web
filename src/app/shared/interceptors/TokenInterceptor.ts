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

  private addAuthenticationToken(req: HttpRequest<any>, authorization: string) {
    return req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + authorization
      }
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authorization = localStorage.getItem('Authorization') || '';

    const jwtHelper = new JwtHelperService();

    if (!jwtHelper.isTokenExpired(authorization)) {
      req = this.addAuthenticationToken(req, authorization);
      return next.handle(req);
    }

    if (this.refreshTokenInProgress) {
      return this.refreshTokenSubject
        .filter(result => result !== null)
        .take(1)
        .switchMap(() =>
          next.handle(this.addAuthenticationToken(req, authorization))
        );
    } else {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);

      return this.authService
        .refreshToken()
        .switchMap(() => {
          const token = localStorage.getItem('Authorization') || '';

          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(token);

          return next.handle(this.addAuthenticationToken(req, token));
        })
        .catch((err: any) => {
          this.refreshTokenInProgress = false;

          this.authService.logout();
          return Observable.throw(err);
        });
    }
  }
}
