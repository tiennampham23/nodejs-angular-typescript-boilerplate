import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EnvironmentService} from '@authentication-based/shared/services';


@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private envService: EnvironmentService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: this.envService.baseUrl + request.url,
    });

    return next.handle(request);
  }
}
