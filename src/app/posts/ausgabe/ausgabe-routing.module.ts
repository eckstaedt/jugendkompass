import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AusgabePage } from './ausgabe.page';

const routes: Routes = [
  {
    path: '',
    component: AusgabePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AusgabePageRoutingModule {}
