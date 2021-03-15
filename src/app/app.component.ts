import { Component } from '@angular/core';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  observer: any;
  observable: any;
  verifyKeyUrl = `https://us-central1-cloud-functions-467d8.cloudfunctions.net/oneTimeKeys/verifyOneTimeKey`;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private deeplinks: Deeplinks,
    private alertController: AlertController,
    private httpClient: HttpClient
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
        if (darkMode) {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
        }
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
          this.httpClient.get(`${this.verifyKeyUrl}/${event.password}`).toPromise()
          .then(res => {
            if (res) {
              this.observer.next(true);
              this.observer.complete();
              this.storage.set('isLoggedIn', true);
              alert.dismiss();
            }
          })
          .catch(() => {
            alert.message = 'Bitte gebe das richtige Passwort ein.';
          });
          return false;
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
