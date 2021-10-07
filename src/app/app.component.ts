import { Component, NgZone } from '@angular/core';
import { version } from '../../package.json';
import {
  Platform,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { FCM } from '@capacitor-community/fcm';
import {
  Plugins,
  PushNotification,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { Router } from '@angular/router';
import { SESSION_FEEDBACK_THRESHOLD, AnalyticsField, PushType } from './utils/constants';
import { FirebaseService } from './services/firebase/firebase.service';
import { FeedbackModalPage } from './settings/feedback-modal/feedback-modal.page';
import { ThemeService } from './services/theme/theme.service';
import { Utils } from './utils/utils';

const fcm = new FCM();
const { App, PushNotifications, Network } = Plugins;
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  observer: any;
  observable: any;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private storage: Storage,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    private firebaseService: FirebaseService,
    private themeService: ThemeService,
    private zone: NgZone,
    private utils: Utils,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.utils.isApp()) {
        this.handleSessionCount();
      }
      if (this.utils.isApp()) {
        this.firebaseService.incrementAnalyticsField(AnalyticsField.APP_SESSIONS);
      } else {
        this.firebaseService.incrementAnalyticsField(AnalyticsField.WEBSITE_SESSIONS);
      }
      this.statusBar.styleDefault();
      SplashScreen.hide();
      this.themeService.setAppTheme();
      if (this.utils.isApp()) {
        this.configureDeepLinks();
        this.registerEvents();
        this.setupNetworkCheck();
        this.setupPush();
        this.addUpdateAnalytic();
      }
    });
  }

  async handleSessionCount() {
    let count = await this.storage.get('sessions');
    await this.storage.set('sessions', count ? count + 1 : 1);

    if (count === SESSION_FEEDBACK_THRESHOLD) {
      const hasFeedbackSend: boolean = await this.storage.get(
        'hasFeedbackSend',
      );
      if (!hasFeedbackSend) {
        const alert = await this.alertController.create({
          header: 'Gefällt dir die App?',
          message:
            'Schön, dass du die Jugendkompass App nutzt. Ein kleines Feedback von dir würde uns helfen, die App weiter zu verbessern. Bitte nimm dir ein paar Minuten Zeit und fülle das Feedbackformular aus. Wenn du gerade keine Zeit hast: Du findest das Formular jederzeit in den Einstellungen.',
          buttons: [
            {
              text: 'Nein danke',
            },
            {
              text: 'Ja gerne',
              handler: async () => {
                const modal: HTMLIonModalElement = await this.modalController.create(
                  {
                    component: FeedbackModalPage,
                  },
                );

                await modal.present();
              },
            },
          ],
        });

        alert.present();
      }
    }
  }

  navigateToAusgabe(id: string) {
    this.router.navigateByUrl(`/tabs/posts/ausgabe/${id}`);
  }

  navigateToImpulse(id: string) {
    this.router.navigateByUrl(`/tabs/impulse/${id}`);
  }

  setupPush() {
    if (this.platform.is('capacitor')) {
      PushNotifications.addListener(
        'pushNotificationReceived',
        async (notification: PushNotification) => {
          const buttons: any[] = [];
          if (notification?.data?.ausgabe) {
            buttons.push({
              text: 'Ausgabe anzeigen',
              handler: () => {
                this.navigateToAusgabe(notification.data.ausgabe);
                this.firebaseService.incrementAnalyticsField(
                  AnalyticsField.PUSH_OPENED_FROM_APP,
                  {
                    type: PushType.GENERAL,
                    id: notification.data.ausgabe
                  }
                );
              },
            });
          } else if (notification?.data?.impulse) {
            buttons.push({
              text: 'Impuls anzeigen',
              handler: () => {
                this.navigateToImpulse(notification.data.impulse);
                this.firebaseService.incrementAnalyticsField(
                  AnalyticsField.PUSH_OPENED_FROM_APP,
                  {
                    type: PushType.IMPULSE,
                    id: notification.data.impulse
                  }
                );
              },
            });
          } else {
            this.firebaseService.incrementAnalyticsField(
              AnalyticsField.PUSH_OPENED_FROM_APP,
              {
                type: PushType.GENERAL,
              }
            );
          }
          buttons.push({
            text: 'Okay',
          });
          const alert = await this.alertController.create({
            header: notification.title,
            message: notification.body,
            buttons: buttons,
          });

          await alert.present();
        },
      );

      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          if (notification.notification?.data?.ausgabe) {
            this.navigateToAusgabe(notification.notification.data.ausgabe);
            this.firebaseService.incrementAnalyticsField(
              AnalyticsField.PUSH_OPENED_FROM_OUTSIDE,
              {
                type: PushType.GENERAL,
                id: notification.notification.data.ausgabe
              }
            );
          } else if (notification.notification?.data?.impulse) {
            this.navigateToImpulse(notification.notification.data.impulse);
            this.firebaseService.incrementAnalyticsField(
              AnalyticsField.PUSH_OPENED_FROM_OUTSIDE,
              {
                type: PushType.IMPULSE,
                id: notification.notification.data.impulse
              }
            );
          } else {
            this.firebaseService.incrementAnalyticsField(
              AnalyticsField.PUSH_OPENED_FROM_OUTSIDE,
              {
                type: PushType.GENERAL,
              }
            );
          }
        },
      );

      this.storage.get('oldUser').then((oldUser: boolean): void => {
        if (oldUser) {
          PushNotifications.requestPermission().then((res: any) => {
            if (res.granted) {
              PushNotifications.register()
                .then(() => {
                  this.storage.get('pushGeneral').then((isOn: boolean) => {
                    if (isOn !== false) {
                      fcm
                      .subscribeTo({ topic: PushType.GENERAL })
                      .then(() => this.storage.set('pushGeneral', true))
                      .catch(err => console.log(err));
                    }
                  });
                  this.storage.get('pushAusgabe').then((isOn: boolean) => {
                    if (isOn !== false) {
                      fcm
                      .subscribeTo({ topic: PushType.AUSGABE })
                      .then(() => this.storage.set('pushAusgabe', true))
                      .catch(err => console.log(err));
                    }
                  });
                  this.storage.get('pushImpulse').then((isOn: boolean) => {
                    if (isOn !== false) {
                      fcm
                      .subscribeTo({ topic: PushType.IMPULSE })
                      .then(() => this.storage.set('pushImpulse', true))
                      .catch(err => console.log(err));
                    }
                  });
                })
                .catch(err => console.log(JSON.stringify(err)));
            }
          });
        }
      });
    }
  }

  public getObservable() {
    return this.observable;
  }

  registerEvents(): void {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (
        this.router.url === '/tabs/posts' ||
        this.router.url === '/tabs/favorites' ||
        this.router.url === '/tabs/settings' ||
        this.router.url === '/'
      ) {
        App.exitApp();
      }
    });
  }

  async setupNetworkCheck() {
    let alert = await this.createNetworkAlert();
    Network.addListener('networkStatusChange', async status => {
      if (
        !status.connected &&
        this.router.url.search('/tabs/favorites') === -1
      ) {
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
          },
        },
        {
          text: 'Abbrechen',
        },
      ],
    });
    return alert;
  }

  async configureDeepLinks() {
    App.addListener('appUrlOpen', (event: any) => {
      this.zone.run(async () => {
        const slug = event.url.split(".com").pop();
        if (slug) {
          this.router.navigateByUrl(slug);
        }
      });
    });

    const urlOpen = await Plugins.App.getLaunchUrl();
    if (urlOpen?.url) {
      const slug = urlOpen.url.split(".com").pop();
      window.setTimeout(() => {
        this.router.navigateByUrl(slug);
      }, 200);
    };
  }

  async addUpdateAnalytic() {
    const oldVersion: string | undefined = await this.storage.get('version');

    if (!oldVersion) {
      await this.storage.set('version', version);
      return;
    }

    if (oldVersion !== version) {
      this.firebaseService.incrementAnalyticsField(
        AnalyticsField.APP_UPDATED,
        { version }
      );
      await this.storage.set('version', version);
    }
  }
}
