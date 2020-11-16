import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../../shared/services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.credentials) {
      let authorization = `Bearer ${this.authService.credentials.token}`;
      const isAuth =
        this.authService.credentials.type === null ||
        this.authService.credentials.type === undefined;
      if (!isAuth) {
        authorization = authorization.replace(
          /^/,
          this.authService.credentials.type
        );
      }
      req = req.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          Authorization: authorization
        }
      });
    }
    return next.handle(req);
  }
}
