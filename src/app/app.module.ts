import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';

import { FilterModalPageModule } from './posts/filter-modal/filter-modal.module';
import { FeedbackModalPageModule } from './settings/feedback-modal/feedback-modal.module';
import { FileUploadModule } from 'ng2-file-upload';
import { AnswersModalPageModule } from './settings/answers-modal/answers-modal.module';
import { getAuth, indexedDBLocalPersistence, initializeAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Capacitor } from '@capacitor/core';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FilterModalPageModule,
        FeedbackModalPageModule,
        AnswersModalPageModule,
        FileUploadModule,
        IonicStorageModule.forRoot()
    ], providers: [
        provideFirebaseApp(() => {
            const app = initializeApp(environment.firebase);
            if (Capacitor.isNativePlatform()) {
                initializeAuth(app, {
                    persistence: indexedDBLocalPersistence
                });
            }
            return app;
        }),
        provideFirestore(() => {
            const firestore = getFirestore();
            // enableIndexedDbPersistence(firestore);
            return firestore;
        }),
        provideAuth(() => getAuth()),
        provideFunctions(() => getFunctions()),
        provideStorage(() => getStorage()),
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
export class AppModule { }
