import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationService} from './notification.service';
import {NzNotificationModule} from 'ng-zorro-antd/notification';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzNotificationModule
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationModule {
}
