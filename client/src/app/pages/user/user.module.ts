import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './pages/user-list/user-list.component';
import {UserRoutingModule} from './user-routing.module';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzFormModule} from 'ng-zorro-antd/form';
import {UserBusinessComponent} from './pages/user-business/user-business.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {DirectiveModule} from '../../shared/directives/directive.module';


@NgModule({
  declarations: [UserListComponent, UserBusinessComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    DirectiveModule,
  ]
})
export class UserModule {
}
