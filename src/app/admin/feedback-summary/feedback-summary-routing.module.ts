import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackSummaryPage } from './feedback-summary.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackSummaryPageRoutingModule {}
