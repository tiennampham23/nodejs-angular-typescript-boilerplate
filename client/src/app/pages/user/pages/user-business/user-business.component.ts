import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserCreateDto } from '@authentication-based/core/dtos';
import { ResponseApi, UserInterface } from '@authentication-based/core/interfaces';
import { NotificationService } from '@authentication-based/notification/notification.service';
import { UserService } from '@authentication-based/shared/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-business',
  templateUrl: './user-business.component.html',
  styleUrls: ['./user-business.component.scss']
})
export class UserBusinessComponent implements OnInit, OnDestroy {
  userBusinessFormGroup: FormGroup;
  action = 'CREATE';
  userId: number;
  currentUser: UserInterface;
  actions: string[];
  private destroyed$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.initForm();
    this.loadParamsUrl();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  submitForm(): void {
    if (this.userBusinessFormGroup.invalid) {
      return;
    }
    const {
      name,
      email,
      password
    } = this.userBusinessFormGroup.value;
    const userCreateDto: UserCreateDto = {
      name,
      email,
      password
    };
    if (this.action === 'CREATE') {
      const createUser$ = this.userService.createUser(userCreateDto)
        .pipe(takeUntil(this.destroyed$));
      createUser$.subscribe(() => {
        this.notificationService.showSuccess('Create new user successful', '');
        return this.router.navigateByUrl('/user');
      });
    } else {
      const updateUser$ = this.userService.updateUser(this.userId, userCreateDto)
        .pipe(takeUntil(this.destroyed$));
      updateUser$.subscribe(() => {
        this.notificationService.showSuccess('Update user successful', '');
        return this.router.navigateByUrl('/user');
      });
    }
  }

  cancelForm(): void {
    this.router.navigateByUrl('/user').then();
  }

  private initForm(): void {
    this.userBusinessFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }


  private loadParamsUrl(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route.params.subscribe((params) => {
          if (this.userId !== params.userId) {
            this.userId = params.userId;
            this.loadUser(this.userId);
          }
        });
      }
    });
  }

  private loadUser(userId: number): void {
    const user$ = this.userService.loadUserById(userId)
      .pipe(takeUntil(this.destroyed$));
    user$.subscribe((res: ResponseApi<UserInterface>) => {
      this.action = 'UPDATE';
      this.currentUser = res.data;
      this.patchValueForm(this.currentUser);
    });
  }

  private patchValueForm(user: UserInterface): void {
    this.userBusinessFormGroup.patchValue({
      email: user.email,
      name: user.name,
    });
  }
}
