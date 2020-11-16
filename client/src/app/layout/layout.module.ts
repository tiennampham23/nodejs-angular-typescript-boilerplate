import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {LayoutRoutingModule} from './layout-routing.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {IconsProviderModule} from '../icons-provider.module';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NzLayoutModule,
    IconsProviderModule,
    NzMenuModule,
    NzButtonModule,
    NzDropDownModule
  ]
})
export class LayoutModule { }
