import packageInfo from '../../../../package.json';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Plugins } from '@capacitor/core';
import {
  Platform,
  ActionSheetController,
  ModalController,
} from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { FeedbackModalPage } from '../feedback-modal/feedback-modal.page';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Utils } from 'src/app/utils/utils';
const { Share } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public version: string = packageInfo.version;
  public theme: string = 'default';
  public isAdmin: boolean = false;
  public isApp: boolean = true;
  public feedbackProvided: boolean = false;

  constructor(
    private storage: Storage,
    private plt: Platform,
    private actionSheetController: ActionSheetController,
    private firebaseService: FirebaseService,
    private modalController: ModalController,
    private themeService: ThemeService,
    private utils: Utils,
  ) {}

  async ngOnInit() {
    this.theme = await this.themeService.getThemeInStorage();
    this.isApp = this.utils.isApp();

    this.firebaseService.subscribeToAdmin().subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  async ionViewWillEnter() {
    this.feedbackProvided = await this.storage.get('hasFeedbackSend');
  }

  async openFeedbackModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: FeedbackModalPage,
    });

    modal.onDidDismiss().then((res: any) => {
      this.feedbackProvided = res.data;
    });

    await modal.present();
  }

  onThemeChange() {
    this.themeService.themeChange(this.theme);
  }

  async openContactActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'E-Mail',
          handler: () =>
            this.openContactSource('mailto:entwickler@jugendkompass.de'),
        },
        {
          text: 'Telegram',
          handler: () => this.openContactSource('https://t.me/JugendKompass'),
        },
        {
          text: 'Whatsapp',
          handler: () =>
            this.openContactSource(
              'https://api.whatsapp.com/send?phone=4915737855537',
            ),
        },
        {
          text: 'Abbrechen',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  openContactSource(url: string): void {
    window.open(url, '_blank');
  }

  async share() {
    if (this.utils.isApp()) {
      await Share.share({
        title: 'Artikel teilen',
        text: 'Jugendkompass',
        url: this.plt.is('ios')
          ? 'https://apps.apple.com/de/app/jugendkompass/id1559123537'
          : 'https://play.google.com/store/apps/details?id=io.stephanus.jugendkompass',
        dialogTitle: 'App weiterempfehlen',
      });
    } else {
      await this.openShareActionSheet();
    }
  }

  async openShareActionSheet(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'iOS App weiterempfehlen',
          icon: 'logo-apple',
          handler: () => {
            window.open(
              'https://apps.apple.com/de/app/jugendkompass/id1559123537',
              '_blank',
            ); // URL anpassen sobald im App Store
          },
        },
        {
          text: 'Android App weiterempfehlen',
          icon: 'logo-android',
          handler: () => {
            window.open(
              'https://play.google.com/store/apps/details?id=io.stephanus.jugendkompass',
              '_blank',
            ); // URL anpassen sobald im Play Store
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
}
