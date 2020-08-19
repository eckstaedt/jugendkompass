import { Component } from '@angular/core';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { PostPage } from './posts/post/post.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private deeplinks: Deeplinks
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupDeepLinks();
      this.storage.get('darkMode').then((darkMode: boolean) => {
        document.body.classList.toggle('dark', darkMode);
      });
    });
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
