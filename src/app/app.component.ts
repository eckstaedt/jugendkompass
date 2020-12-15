import { Component } from '@angular/core';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  observer: any;
  observable: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private deeplinks: Deeplinks,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.observable = new Observable((observer) => {
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupDeepLinks();
      this.storage.get('darkMode').then((darkMode: boolean) => {
        document.body.classList.toggle('dark', darkMode);
      });
    });
  }

  public getObservable() {
    return this.observable;
  }

  async showPasswordAlert() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: "App Passwort erforderlich",
      cssClass: 'password-alert',
      inputs: [{
        type: 'password',
        placeholder: 'Passwort eingeben...',
        name: 'password'
      }],
      buttons: [{
        text: 'Okay',
        handler: (event: any) => {
          if (event.password === 'JugendSpeyer2020') {
            this.observer.next(true);
            this.observer.complete();
            this.storage.set('isLoggedIn', true);
          } else {
            alert.message = 'Bitte gebe das richtige Passwort ein.'
            return false;
          }
        }
      }]
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
