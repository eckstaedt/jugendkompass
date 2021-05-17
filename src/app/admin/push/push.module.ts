import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PushPageRoutingModule } from './push-routing.module';

import { PushPage } from './push.page';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PushPageRoutingModule,
    FileUploadModule,
  ],
  declarations: [PushPage],
})
export class PushPageModule {}
