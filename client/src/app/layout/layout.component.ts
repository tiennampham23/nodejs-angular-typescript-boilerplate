import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationApiService, AuthenticationService} from '@authentication-based/shared/services';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ResponseApi} from '@authentication-based/core/interfaces';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  isAdmin = false;
  email = '';
  private destroyed$ = new Subject();
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authApi: AuthenticationApiService
  ) {
    this.email = this.authenticationService.email;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onLogout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/auth/login').then();
  }
}
