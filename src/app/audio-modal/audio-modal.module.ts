import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudioModalPageRoutingModule } from './audio-modal-routing.module';

import { AudioModalPage } from './audio-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudioModalPageRoutingModule
  ],
  declarations: [AudioModalPage]
})
export class AudioModalPageModule {}
