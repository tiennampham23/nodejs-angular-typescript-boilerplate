import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {of, Subject} from 'rxjs';
import {AuthenticationApiService, AuthenticationService, Logger} from '@authentication-based/shared/services';
import {Credentials, ResponseApi, AuthInterface} from '@authentication-based/core/interfaces';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NotificationService} from '@authentication-based/notification/notification.service';

const logger = new Logger('LoginComponent');


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  private destroyed$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthenticationApiService,
    private authLogicService: AuthenticationService
  ) {
    this.initialForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const {email, password, remember} = this.loginForm.value;
    const user: AuthInterface = {
      email,
      password,
      remember
    };
    const auth$ = this.authService.login(user)
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((response: ResponseApi<string>) => {
          const credential: Credentials = {
            email,
            token: response.data
          };
          return of(credential);
        }),
        catchError((err: ResponseApi<string>) => {
          this.notificationService.showError('Login Fail', err.message);
          return of(null);
        })
      );
    auth$.subscribe((credential: Credentials) => {
      if (credential) {
        this.authLogicService.login(credential, remember);
        this.notificationService.showSuccess('Login Successful', '');
        return this.router.navigateByUrl('/');
      }
    });
  }

  private initialForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
      remember: [false],
    });
  }
}
