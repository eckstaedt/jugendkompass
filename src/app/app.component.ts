import { Component } from '@angular/core';

import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FCM } from '@capacitor-community/fcm';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { Utils } from './utils/utils';
import { SESSION_FEEDBACK_THRESHOLD, AnalyticsField } from './utils/constants';
import { FirebaseService } from './services/firebase.service';
import { environment } from 'src/environments/environment';

const fcm = new FCM();
const { App, PushNotifications, Network } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  observer: any;
  observable: any;
  verifyKeyUrl = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private alertController: AlertController,
    private httpClient: HttpClient,
    private loadingController: LoadingController,
    private router: Router,
    private utils: Utils,
    private firebaseService: FirebaseService
  ) {
    this.verifyKeyUrl = environment.production ?
      'https://us-central1-jugendkompass-46aa7.cloudfunctions.net/oneTimeKeys/verifyOneTimeKey'
      : 'https://us-central1-jugendkompasstest.cloudfunctions.net/oneTimeKeys/verifyOneTimeKey'
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.handleSessionCount();
      this.firebaseService.incrementAnalyticsField(AnalyticsField.APP_SESSIONS);
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
      this.registerEvents();
      this.setupTheme();
      this.setupNetworkCheck();
    });
  }

  async handleSessionCount() {
    let count = await this.storage.get('sessions');
    await this.storage.set('sessions', count ? count + 1 : 1);

    if (count === SESSION_FEEDBACK_THRESHOLD) {
      const hasFeedbackSend: boolean = await this.storage.get('hasFeedbackSend');
      if (!hasFeedbackSend) {
        const alert = await this.alertController.create({
          header: 'Gefällt dir die App?',
          message: 'Vielen Dank, dass du die Jugendkompass App nutzt. Ein kleines Feedback von dir würde uns weiterhelfen, die App kontinuierlich zu verbessern. Bitte nimm dir ein paar Minuten und fülle das Feedbackformular aus. Anstonten kannst du das Formular jederzeit in den Einstellungen finden.',
          buttons: [{
            text: 'Ja gerne',
            handler: () => {
              this.utils.openFeedbackModal();
            }
          },
          {
            text: 'Nein danke'
          }]
        });

        alert.present();
      }
    }
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
    this.storage.get('theme').then((theme: string) => {
      if (theme) {
        if (theme === 'default') {
          const prefersColor = window.matchMedia('(prefers-color-scheme: dark)');
          var defaultTheme = prefersColor.matches;
          document.body.classList.toggle('dark', defaultTheme);
        } else if (theme === 'light') {
          document.body.classList.toggle('dark', false);
        } else if (theme === 'dark') {
          document.body.classList.toggle('dark', true);
        }
      } else {
        const prefersColor = window.matchMedia('(prefers-color-scheme: dark)');
        var defaultTheme = prefersColor.matches;
        document.body.classList.toggle('dark', defaultTheme);
        this.storage.set('theme', 'default');
      }
    });

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
          handler: async (event: any) => {
            if (!event.password) {
              this.showPasswordAlert(
                (message = 'Bitte gebe das Passwort ein.'),
              );
              this.firebaseService.incrementAnalyticsField(AnalyticsField.INVALID_PASSWORD_PROVIDED);
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
                  this.firebaseService.incrementAnalyticsField(AnalyticsField.CORRECT_PASSWORD_PROVIDED);
                }
              })
              .catch(() => {
                this.showPasswordAlert(
                  (message = 'Bitte gebe das richtige Passwort ein.'),
                );
                this.firebaseService.incrementAnalyticsField(AnalyticsField.INVALID_PASSWORD_PROVIDED);
              });
            loading.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }

  registerEvents(): void {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (this.router.url === '/tabs/posts' || this.router.url === '/tabs/favorites'
        || this.router.url === '/tabs/settings' || this.router.url === '/') {
        App.exitApp();
      }
    });
  }

  async setupNetworkCheck(){
    let alert = await this.createNetworkAlert();
    Network.addListener('networkStatusChange', async (status) => {
      if (!status.connected && this.router.url !== '/tabs/favorites') {
        alert.present();
      } else {
        if (alert) {
          alert.dismiss();
        }
        alert = await this.createNetworkAlert();
      }
    });

  }

  async createNetworkAlert() {
    let alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Keine Internetverbindung vorhanden',
      cssClass: 'password-alert',
      buttons: [
        {
          text: 'Zu meinen Favoriten',
          handler: () => {
            this.router.navigateByUrl('/tabs/favorites', { replaceUrl: true });
          }
        },
        {
          text: 'Abbrechen'
        }],
    });
    return alert;
  }
}
