import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeysPageRoutingModule } from './keys-routing.module';

import { KeysPage } from './keys.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KeysPageRoutingModule
  ],
  declarations: [KeysPage]
})
export class KeysPageModule {}
