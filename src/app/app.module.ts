import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';

import { IonicStorageModule } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { FilterModalPageModule } from './posts/filter-modal/filter-modal.module';
import { FeedbackModalPageModule } from './settings/feedback-modal/feedback-modal.module';
import { ChartsModule } from 'ng2-charts';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileUploadModule } from 'ng2-file-upload';
import { AnswersModalPageModule } from './settings/answers-modal/answers-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FilterModalPageModule,
    FeedbackModalPageModule,
    AnswersModalPageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore();
      return firestore;
    }),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideFunctions(() => getFunctions()),
    IonicStorageModule.forRoot(),
    ChartsModule,
    FileUploadModule,
  ],
  providers: [
    PhotoViewer,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FileOpener,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
