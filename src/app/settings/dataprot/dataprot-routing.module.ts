import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataprotPage } from './dataprot.page';

const routes: Routes = [
  {
    path: '',
    component: DataprotPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataprotPageRoutingModule {}
