import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatesPageRoutingModule } from './dates-routing.module';

import { DatesPage } from './dates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatesPageRoutingModule
  ],
  declarations: [DatesPage]
})
export class DatesPageModule {}
