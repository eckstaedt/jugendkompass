import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpulsePage } from './impulse.page';

const routes: Routes = [
  {
    path: '',
    component: ImpulsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImpulsePageRoutingModule {}
