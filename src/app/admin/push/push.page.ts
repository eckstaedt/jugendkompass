import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';
import { Ausgabe } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-push',
  templateUrl: './push.page.html',
  styleUrls: ['./push.page.scss'],
})
export class PushPage implements OnInit {

  public title: string = '';
  public body: string = '';
  public isAusgabe: boolean = true;
  public ausgaben: Ausgabe[] = [];
  public ausgabe: Ausgabe;

  constructor(
    private firebaseService: FirebaseService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  async getCategories() {
    await this.firebaseService.getAusgaben();
    this.ausgaben = this.firebaseService.getAusgaben();
    this.ausgabe = this.ausgaben[0];
  }

  async showConfirmAlert(isTest: boolean) {
    const alert: any = await this.alertController.create({
      header: isTest ? 'Testnachricht senden?' : 'Nachricht senden?',
      message: `Titel: ${this.title}\nBody: ${this.body}`,
      buttons: [, {
        text: 'Abbrechen'
      }, {
        text: 'Senden',
        handler: () => {
          if (isTest) {
            this.sendTestPush();
          } else {
            this.sendPush();
          }
        }
      }]
    });

    await alert.present();
  }

  sendTestPush() {
    this.firebaseService.sendTestPush({
      title: this.title,
      body: this.body,
      image: this.isAusgabe ? this.ausgabe?.imageUrl : ''
    }, this.isAusgabe ? { ausgabe: this.ausgabe.id.toString() } : {});
  }

  sendPush() {
    this.firebaseService.sendPush({
      title: this.title,
      body: this.body,
      image: this.isAusgabe ? this.ausgabe?.imageUrl : ''
    }, this.isAusgabe ? { ausgabe: this.ausgabe.id.toString() } : {});
  }

}
