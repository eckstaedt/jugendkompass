import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpulseListPageRoutingModule } from './impulse-list-routing.module';

import { ImpulseListPage } from './impulse-list.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedDirectivesModule,
    ImpulseListPageRoutingModule
  ],
  declarations: [ImpulseListPage]
})
export class ImpulseListPageModule {}
