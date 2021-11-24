import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioModalPage } from './audio-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AudioModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioModalPageRoutingModule {}
