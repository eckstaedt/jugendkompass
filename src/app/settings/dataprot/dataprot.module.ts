import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataprotPageRoutingModule } from './dataprot-routing.module';

import { DataprotPage } from './dataprot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataprotPageRoutingModule
  ],
  declarations: [DataprotPage]
})
export class DataprotPageModule {}
