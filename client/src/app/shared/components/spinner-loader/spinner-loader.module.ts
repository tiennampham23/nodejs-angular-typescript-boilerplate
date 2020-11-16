import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLoaderComponent } from './spinner-loader.component';
import {NzSpinModule} from 'ng-zorro-antd/spin';



@NgModule({
    declarations: [SpinnerLoaderComponent],
    exports: [
        SpinnerLoaderComponent
    ],
  imports: [
    CommonModule,
    NzSpinModule
  ]
})
export class SpinnerLoaderModule { }
