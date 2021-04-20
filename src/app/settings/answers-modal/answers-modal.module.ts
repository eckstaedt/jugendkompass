import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnswersModalPageRoutingModule } from './answers-modal-routing.module';

import { AnswersModalPage } from './answers-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnswersModalPageRoutingModule
  ],
  declarations: [AnswersModalPage]
})
export class AnswersModalPageModule {}
