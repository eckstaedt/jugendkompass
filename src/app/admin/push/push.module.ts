import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PushPageRoutingModule } from './push-routing.module';

import { PushPage } from './push.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PushPageRoutingModule
  ],
  declarations: [PushPage]
})
export class PushPageModule {}
