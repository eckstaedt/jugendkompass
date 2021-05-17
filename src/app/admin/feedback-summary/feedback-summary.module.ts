import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackSummaryPageRoutingModule } from './feedback-summary-routing.module';

import { FeedbackSummaryPage } from './feedback-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackSummaryPageRoutingModule,
  ],
  declarations: [FeedbackSummaryPage],
})
export class FeedbackSummaryPageModule {}
