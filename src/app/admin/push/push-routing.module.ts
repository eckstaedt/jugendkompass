import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PushPage } from './push.page';

const routes: Routes = [
  {
    path: '',
    component: PushPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PushPageRoutingModule {}
