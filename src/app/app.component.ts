import { Component } from '@angular/core';

import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FCM } from '@capacitor-community/fcm';
import { Plugins } from '@capacitor/core';

const fcm = new FCM();
const { App, PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  observer: any;
  observable: any;
  verifyKeyUrl = `https://us-central1-jugendkompass-46aa7.cloudfunctions.net/oneTimeKeys/verifyOneTimeKey`;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private alertController: AlertController,
    private httpClient: HttpClient,
    private loadingController: LoadingController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.observable = new Observable(observer => {
        this.observer = observer;
        this.storage.get('isLoggedIn').then((isLoggedIn: boolean) => {
          if (isLoggedIn) {
            this.observer.next(true);
            observer.complete();
          } else {
            this.showPasswordAlert();
            this.observer.next(false);
          }
        });
      });
      this.setupDeepLinks();
      this.setupTheme();
    });
  }

  setupPush() {
    PushNotifications.requestPermission().then((res: any) => {
      if (res.granted) {
        PushNotifications.register()
          .then(() => {
            fcm
              .subscribeTo({ topic: 'general' })
              .then(() => console.log('subscribed successfully'))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(JSON.stringify(err)));
      }
    });
  }

  setupTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.toggleDarkTheme(prefersDark.matches);
    prefersDark.addListener((mediaQuery: any) => this.toggleDarkTheme(mediaQuery.matches));
  }

  toggleDarkTheme(shouldAdd: boolean): void {
    document.body.classList.toggle('dark', shouldAdd);
  }

  public getObservable() {
    return this.observable;
  }

  async showPasswordAlert(message?: string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'App Passwort erforderlich',
      cssClass: 'password-alert',
      inputs: [
        {
          type: 'password',
          placeholder: 'Passwort eingeben...',
          name: 'password',
        },
      ],
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: async(event: any) => {
            if(!event.password){
              this.showPasswordAlert(message = 'Bitte gebe das Passwort ein.');
              return;
            }
            const loading = await this.loadingController.create();
            loading.present();
            await this.httpClient
              .get(`${this.verifyKeyUrl}/${event.password}`)
              .toPromise()
              .then(res => {
                if (res) {
                  this.observer.next(true);
                  this.observer.complete();
                  this.storage.set('isLoggedIn', true);
                  alert.dismiss();
                }
              })
              .catch(() => {
                this.showPasswordAlert(message = 'Bitte gebe das richtige Passwort ein.');
              });
            loading.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }

  setupDeepLinks() {
    // TODO
    // this.deeplinks.route({
    //   '/tabs/posts/:id': PostPage
    // }).subscribe((match: any) => {
    //   console.log(match);
    // });
  }
}
