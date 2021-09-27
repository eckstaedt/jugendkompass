import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Plugins } from '@capacitor/core';
import { FCM } from '@capacitor-community/fcm';
import { PushType } from '../utils/constants';

const fcm = new FCM();
const { PushNotifications } = Plugins;

@Component({
  selector: 'app-push-settings',
  templateUrl: './push-settings.page.html',
  styleUrls: ['./push-settings.page.scss'],
})
export class PushSettingsPage implements OnInit {

  public general: boolean;
  public impulse: boolean;

  constructor(
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.general = Boolean(await this.storage.get('pushGeneral'));
    this.impulse = Boolean(await this.storage.get('pushImpulse'));
  }

  onGeneralChange() {
    if (this.general) {
      fcm.subscribeTo({ topic: PushType.GENERAL }).then(async () => {
        await this.storage.set('pushGeneral', this.general);
      });
    } else {
      fcm.unsubscribeFrom({ topic: PushType.GENERAL }).then(async () => {
        await this.storage.set('pushGeneral', this.general);
      });
    }
  }

  async onImpulseChange() {
    if (this.impulse) {
      fcm.subscribeTo({ topic: PushType.IMPULSE }).then(async () => {
        await this.storage.set('pushImpulse', this.impulse);
      });
    } else {
      fcm.unsubscribeFrom({ topic: PushType.IMPULSE }).then(async () => {
        await this.storage.set('pushImpulse', this.impulse);
      });
    }
  }

}
