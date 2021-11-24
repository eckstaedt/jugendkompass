import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { ParallaxHeaderDirective } from './parallax-header.directive';

@NgModule({
  declarations: [HideHeaderDirective, ParallaxHeaderDirective],
  imports: [CommonModule],
  exports: [HideHeaderDirective, ParallaxHeaderDirective],
})
export class SharedDirectivesModule {}
