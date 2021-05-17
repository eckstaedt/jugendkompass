import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwipeDirective } from './swipe.directive';

@NgModule({
  declarations: [SwipeDirective],
  imports: [
    CommonModule
  ],
  exports: [SwipeDirective]
})
export class SwipeModule { }
