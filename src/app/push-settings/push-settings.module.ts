import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PushSettingsPageRoutingModule } from './push-settings-routing.module';

import { PushSettingsPage } from './push-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PushSettingsPageRoutingModule
  ],
  declarations: [PushSettingsPage]
})
export class PushSettingsPageModule {}
