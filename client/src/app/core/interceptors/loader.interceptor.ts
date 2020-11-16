import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoaderService} from '../../shared/services/loader.service';
import {finalize} from 'rxjs/operators';
import {OverlayRef} from '@angular/cdk/overlay';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.showOverlay();
    return next.handle(req).pipe(
      finalize(() => {
        this.disposeRef();
      })
    );
  }

  private showOverlay(): OverlayRef {
    return this.loaderService.open();
  }

  private disposeRef(): void {
    this.loaderService.close();
  }
}
