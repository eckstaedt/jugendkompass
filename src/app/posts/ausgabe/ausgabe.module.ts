import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AusgabePageRoutingModule } from './ausgabe-routing.module';

import { AusgabePage } from './ausgabe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AusgabePageRoutingModule
  ],
  declarations: [AusgabePage]
})
export class AusgabePageModule {}
