import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnswersModalPage } from './answers-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AnswersModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnswersModalPageRoutingModule {}
