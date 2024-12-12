import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostListPageRoutingModule } from './post-list-routing.module';

import { PostListPage } from './post-list.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { SwipeModule } from 'src/app/services/swipe/swipe.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostListPageRoutingModule,
    SharedDirectivesModule,
    SwipeModule
  ],
  declarations: [PostListPage],
})
export class PostListPageModule {}
