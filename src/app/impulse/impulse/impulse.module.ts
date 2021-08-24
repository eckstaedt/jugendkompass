import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpulsePageRoutingModule } from './impulse-routing.module';

import { ImpulsePage } from './impulse.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedDirectivesModule,
    ImpulsePageRoutingModule
  ],
  declarations: [ImpulsePage]
})
export class ImpulsePageModule {}
