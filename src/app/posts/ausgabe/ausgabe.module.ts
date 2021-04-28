import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AusgabePageRoutingModule } from './ausgabe-routing.module';

import { AusgabePage } from './ausgabe.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedDirectivesModule,
    AusgabePageRoutingModule,
    FileUploadModule
  ],
  declarations: [AusgabePage]
})
export class AusgabePageModule {}
