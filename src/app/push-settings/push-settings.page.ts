import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FCM } from '@capacitor-community/fcm';
import { PushType } from '../utils/constants';

@Component({
  selector: 'app-push-settings',
  templateUrl: './push-settings.page.html',
  styleUrls: ['./push-settings.page.scss'],
})
export class PushSettingsPage implements OnInit {

  public general: boolean;
  public impulse: boolean;
  public ausgabe: boolean;
  public vdt: boolean;

  constructor(
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.general = Boolean(await this.storage.get('pushGeneral'));
    this.impulse = Boolean(await this.storage.get('pushImpulse'));
    this.ausgabe = Boolean(await this.storage.get('pushAusgabe'));
    this.vdt = Boolean(await this.storage.get('pushVdt'));
  }

  onAusgabeChange() {
    if (this.ausgabe) {
      FCM.subscribeTo({ topic: PushType.AUSGABE }).then(async () => {
        await this.storage.set('pushAusgabe', this.general);
      });
    } else {
      FCM.unsubscribeFrom({ topic: PushType.AUSGABE }).then(async () => {
        await this.storage.set('pushAusgabe', this.general);
      });
    }
  }

  onGeneralChange() {
    if (this.general) {
      FCM.subscribeTo({ topic: PushType.GENERAL }).then(async () => {
        await this.storage.set('pushGeneral', this.general);
      });
    } else {
      FCM.unsubscribeFrom({ topic: PushType.GENERAL }).then(async () => {
        await this.storage.set('pushGeneral', this.general);
      });
    }
  }

  async onImpulseChange() {
    if (this.impulse) {
      FCM.subscribeTo({ topic: PushType.IMPULSE }).then(async () => {
        await this.storage.set('pushImpulse', this.impulse);
      });
    } else {
      FCM.unsubscribeFrom({ topic: PushType.IMPULSE }).then(async () => {
        await this.storage.set('pushImpulse', this.impulse);
      });
    }
  }

  async onVdtChange() {
    if (this.impulse) {
      FCM.subscribeTo({ topic: PushType.VDT }).then(async () => {
        await this.storage.set('pushVdt', this.vdt);
      });
    } else {
      FCM.unsubscribeFrom({ topic: PushType.VDT }).then(async () => {
        await this.storage.set('pushVdt', this.vdt);
      });
    }
  }

}
