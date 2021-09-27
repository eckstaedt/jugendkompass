import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PushSettingsPage } from './push-settings.page';

const routes: Routes = [
  {
    path: '',
    component: PushSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PushSettingsPageRoutingModule {}
