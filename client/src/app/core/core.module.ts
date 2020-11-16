import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {EnvironmentServiceProvider} from './providers/enviroment.provider';
import {ApiPrefixInterceptor, ErrorHandlerInterceptor, LoaderInterceptor, TokenInterceptor} from './interceptors';
import {OverlayModule} from '@angular/cdk/overlay';

const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiPrefixInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
  },
];

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  providers: [
    ...interceptors,
    EnvironmentServiceProvider
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
