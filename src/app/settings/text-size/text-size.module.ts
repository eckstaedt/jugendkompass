import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextSizePageRoutingModule } from './text-size-routing.module';

import { TextSizePage } from './text-size.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TextSizePageRoutingModule],
  declarations: [TextSizePage],
})
export class TextSizePageModule {}
