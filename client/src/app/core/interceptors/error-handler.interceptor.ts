import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from '@authentication-based/shared/services';
import {Router} from '@angular/router';
import {catchError, retry} from 'rxjs/operators';
import {NotificationService} from '@authentication-based/notification/notification.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err) => this.errorHandler(err))
    );
  }

  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (response.status === 401) {
      if (this.router.url !== '/auth/login') {
        this.notificationService.showError('You are not authenticated', response.error.message);
        this.authenticationService.logout();
        this.router.navigateByUrl('/auth/login').then();
        return;
      }
    }
    if (response.status === 403) {
      this.notificationService.showError('You dont have permission', response.error.message);
    }
    return throwError(response.error);
  }
}
