import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FCM } from '@capacitor-community/fcm';
const fcm = new FCM();
import { Plugins, PushNotificationToken, PushNotification } from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  theme = 'default';

  constructor(private router: Router, private storage: Storage) {}

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
  }

  onThemeChange() {
    this.storage.set('theme', this.theme);
    if (this.theme === 'default') {
      const prefersColor = window.matchMedia('(prefers-color-scheme: dark)');
      var defaultTheme = prefersColor.matches;
      document.body.classList.toggle('dark', defaultTheme);
    } else if(this.theme === 'light') {
      document.body.classList.toggle('dark', false);
    } else if(this.theme === 'dark') {
      document.body.classList.toggle('dark', true);
    }
  }
}
