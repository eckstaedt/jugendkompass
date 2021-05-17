import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeysPage } from './keys.page';

const routes: Routes = [
  {
    path: '',
    component: KeysPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeysPageRoutingModule {}
