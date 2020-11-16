import {Injectable} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable()
export class NotificationService {

  private readonly type = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
  };

  constructor(
    private notification: NzNotificationService
  ) {
  }

  showSuccess(title, content): void {
    this.notification.create(
      this.type.success,
      title,
      content
    );
  }

  showWarning(title, content): void {
    this.notification.create(
      this.type.warning,
      title,
      content
    );
  }

  showError(title, content): void {
    this.notification.create(
      this.type.error,
      title,
      content
    );
  }

  showInfo(title, content): void {
    this.notification.create(
      this.type.info,
      title,
      content
    );
  }

}
