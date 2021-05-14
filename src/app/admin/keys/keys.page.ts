import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Observable } from 'rxjs';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.page.html',
  styleUrls: ['./keys.page.scss'],
})
export class KeysPage implements OnInit {
  public keys$: Observable<any[]>;

  constructor(
    private firebaseService: FirebaseService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private utils: Utils
  ) { }

  ngOnInit() {
    this.keys$ = this.firebaseService.getKeys();
  }

  async openCreateAlert() {
    const alert: any = await this.alertController.create({
      message: 'Key hinzufügen',
      inputs: [
        {
          placeholder: 'Key',
          name: 'key',
          type: 'text'
        },
        {
          placeholder: 'Anzahl',
          name: 'count',
          type: 'number',
          min: 1,
          max: 9999
        },
      ],
      buttons: [{
        text: 'Abbrechen'
      }, {
        text: 'Hinzufügen',
        handler: (values: any) => {
          this.firebaseService.addKey({
            value: values.key,
            usedKeys: 0,
            remainingKeyCount: parseInt(values.count, 10)
          }).then(() => {
            this.utils.showToast('Key erfolgreich hinzugefügt', 'success');
          }).catch(() => {
            this.utils.showToast('Fehler beim hinzufügen, probiere es erneut');
          });
        }
      }]
    });

    await alert.present();
  }

  async openUpdateSheet(key: any) {
    const sheet: any = await this.actionSheetController.create({
      header: 'Wähle eine Anzahl',
      buttons: [{
        text: '5',
        handler: () => {
          this.updateKey(key.value, key.remainingKeyCount + 5);
        }
      }, {
        text: '10',
        handler: () => {
          this.updateKey(key.value, key.remainingKeyCount + 10);
        }
      }, {
        text: '35',
        handler: () => {
          this.updateKey(key.value, key.remainingKeyCount + 35);
        }
      }, {
        text: 'Andere...',
        handler: () => {
          this.openInputAlert(key);
        }
      }, {
        text: 'Abbrechen'
      }]
    });

    await sheet.present();
  }

  async openInputAlert(key: any) {
    const alert: any = await this.alertController.create({
      message: 'Gib eine Anzahl an',
      inputs: [
        {
          placeholder: 'Anzahl',
          name: 'count',
          type: 'number',
          min: 1,
          max: 9999
        },
      ],
      buttons: [{
        text: 'Abbrechen'
      }, {
        text: 'Hinzufügen',
        handler: (values: any) => {
          this.updateKey(key.value, key.remainingKeyCount + parseInt(values.count))
        }
      }]
    });

    await alert.present();
  }

  updateKey(value: string, count: number) {
    this.firebaseService.updateKey({
      count: count,
      value: value
    }).then(() => {
      this.utils.showToast('Key erfolgreich geupdated', 'success');
    }).catch(() => {
      this.utils.showToast('Fehler beim updaten, probiere es erneut');
    });
  }

}
