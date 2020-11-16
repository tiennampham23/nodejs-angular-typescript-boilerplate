import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '@authentication-based/shared/services';
import {Subject} from 'rxjs';
import {ResponseApi, UserInterface} from '@authentication-based/core/interfaces';
import {takeUntil} from 'rxjs/operators';
import {NotificationService} from '@authentication-based/notification/notification.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: UserInterface[];
  actions: string[];
  private destroyed$ = new Subject();
  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  removeUser(userId: number): void {
    const removeUser$ = this.userService.deleteUser(userId)
      .pipe(takeUntil(this.destroyed$));
    removeUser$.subscribe(() => {
      this.notificationService.showSuccess('Delete user successful', '');
      this.loadUsers();
    }, () => {
      this.notificationService.showError('Delete user fail', '');
    });
  }

  private loadUsers(): void {
    const users$ = this.userService.loadUsers()
      .pipe(takeUntil(this.destroyed$));
    users$.subscribe((res: ResponseApi<UserInterface[]>) => {
      this.users = res.data;
    });
  }
}
