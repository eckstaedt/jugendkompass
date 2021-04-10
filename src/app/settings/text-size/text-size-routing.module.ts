import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextSizePage } from './text-size.page';

const routes: Routes = [
  {
    path: '',
    component: TextSizePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextSizePageRoutingModule {}
