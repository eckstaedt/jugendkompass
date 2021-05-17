import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FCM } from '@capacitor-community/fcm';
const fcm = new FCM();
import { Plugins } from '@capacitor/core';
import { ThemeService } from '../services/theme/theme.service';
import { AnalyticsField } from '../utils/constants';
import { FirebaseService } from '../services/firebase/firebase.service';

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
    private storage: Storage,
    private themeService: ThemeService,
    private firebaseService: FirebaseService,
  ) {}

  ngOnInit() {}

  toHome() {
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
