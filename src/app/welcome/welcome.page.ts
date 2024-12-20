import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FCM } from '@capacitor-community/fcm';
import { Plugins } from '@capacitor/core';
import { ThemeService } from '../services/theme/theme.service';
import { AnalyticsField, PushType } from '../utils/constants';
import { FirebaseService } from '../services/firebase/firebase.service';
import { StorageService } from '../services/storage.service';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  theme = 'default';
  isDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor(
    private router: Router,
    private storage: StorageService,
    private themeService: ThemeService,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() { }

  toHome() {
    PushNotifications.requestPermissions().then((res: any) => {
      if (res.granted) {
        PushNotifications.register()
          .then(() => {
            this.storage.get('pushGeneral').then((isOn: boolean) => {
              if (isOn !== false) {
                FCM
                  .subscribeTo({ topic: PushType.GENERAL })
                  .then(() => this.storage.set('pushGeneral', true))
                  .catch(err => console.log(err));
              }
            });
            this.storage.get('pushAusgabe').then((isOn: boolean) => {
              if (isOn !== false) {
                FCM
                  .subscribeTo({ topic: PushType.AUSGABE })
                  .then(() => this.storage.set('pushAusgabe', true))
                  .catch(err => console.log(err));
              }
            });
            this.storage.get('pushImpulse').then((isOn: boolean) => {
              if (isOn !== false) {
                FCM
                  .subscribeTo({ topic: PushType.IMPULSE })
                  .then(() => this.storage.set('pushImpulse', true))
                  .catch(err => console.log(err));
              }
            });
            this.storage.get('pushVdt').then((isOn: boolean) => {
              if (isOn !== false) {
                FCM
                  .subscribeTo({ topic: PushType.VDT })
                  .then(() => this.storage.set('pushVdt', false))
                  .catch(err => console.log(err));
              }
            });
          })
          .catch(err => console.log(JSON.stringify(err)));
      }
    });

    this.storage.set('oldUser', true);
    this.router.navigateByUrl('/tabs', { replaceUrl: true });
    this.firebaseService.incrementAnalyticsField(
      AnalyticsField.APP_INSTALLATIONS,
    );
  }

  onThemeChange() {
    this.isDark = this.themeService.themeChange(this.theme);
  }
}
