import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard, NotAuthenticationGuard} from '@authentication-based/core/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@authentication-based/layout/layout.module').then(m => m.LayoutModule),
    canActivate: [
      AuthenticationGuard
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('@authentication-based/authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [
      NotAuthenticationGuard
    ]
  },
  {
    path: '**',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
