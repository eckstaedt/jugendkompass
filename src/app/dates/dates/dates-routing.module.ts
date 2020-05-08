import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatesPage } from './dates.page';

const routes: Routes = [
  {
    path: '',
    component: DatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatesPageRoutingModule {}
