import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Ausgabe, FirebasePost } from 'src/app/utils/interfaces';
import { Utils } from 'src/app/utils/utils';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { PushType } from 'src/app/utils/constants';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-push',
  templateUrl: './push.page.html',
  styleUrls: ['./push.page.scss'],
})
export class PushPage implements OnInit {
  public title: string = '';
  public body: string = '';
  public ausgaben: Ausgabe[] = [];
  public ausgabe: Ausgabe;
  public impulses: FirebasePost[] = [];
  public impulse: FirebasePost;
  public type: PushType = PushType.GENERAL;
  public file: FileLikeObject;
  public fileUploader: FileUploader = new FileUploader({ url: '' });

  constructor(
    private firebaseService: FirebaseService,
    private alertController: AlertController,
    private utils: Utils,
    private toastController: ToastController,
  ) {}

  async ngOnInit() {
    await this.getCategories();
    await this.getImpulses();
  }

  async getCategories() {
    await this.firebaseService.getAusgaben();
    this.ausgaben = this.firebaseService
      .getAusgaben()
      .filter((a: Ausgabe) => !a.pushSend);
    if (this.ausgaben?.length) {
      this.ausgabe = this.ausgaben[0];
    } else {
      this.type = PushType.GENERAL;
    }
  }

  async getImpulses() {
    const impulses: any = await this.firebaseService.getImpulses().pipe(take(1)).toPromise();
    this.impulses = impulses
      .filter((i: FirebasePost) => !i.pushSend);

    if (this.impulses?.length) {
      this.impulse = this.impulses[0];
    } else {
      this.type = PushType.GENERAL;
    }
  }

  onImageSelected() {
    if (this.fileUploader.queue && this.fileUploader.queue.length !== 0) {
      const file: FileLikeObject = this.fileUploader.queue[
        this.fileUploader.queue.length - 1
      ].file;
      if (file.size > 300000) {
        this.showImageUploadError();
        this.fileUploader.queue = [];
      } else {
        this.file = file;
      }
    }
  }

  async showImageUploadError() {
    const toast = await this.toastController.create({
      duration: 3000,
      message: 'Wähle ein Cover mit maximal 300kb aus',
      color: 'danger',
    });
    toast.present();
  }

  async showConfirmAlert(isTest: boolean) {
    if (this.body !== '') {
      const alert: any = await this.alertController.create({
        header: isTest ? 'Testnachricht senden?' : 'Nachricht senden?',
        message: `<p>Titel: ${this.title}</p><p>Body: ${this.body}</p>`,
        buttons: [
          ,
          {
            text: 'Abbrechen',
          },
          {
            text: 'Senden',
            handler: async () => {
              let res: any;
              if (this.file) {
                res = await this.firebaseService.uploadImageFile(this.file);
              }
              if (isTest) {
                this.sendTestPush(res);
              } else {
                this.sendPush(res);
              }
            },
          },
        ],
      });

      await alert.present();
    } else {
      this.utils.showToast(
        'Bitte gebe min. ein Text im Nachricht-Feld ein...',
        'danger',
      );
    }
  }

  sendTestPush(res?: any) {
    this.firebaseService.sendTestPush(
      {
        title: this.title,
        body: this.body,
        image: this.type === PushType.AUSGABE
          ? this.ausgabe?.imageUrl
          : this.type === PushType.IMPULSE ? this.impulse?.postImg.source_url : res?.url,
      },
      this.type === PushType.AUSGABE
        ? { ausgabe: this.ausgabe.id.toString() }
        : this.type === PushType.IMPULSE ? { impulse: this.impulse.id.toString() } : {},
    );
    this.utils.showToast(
      'Die Test Push Mitteilung wurde erfolgreich versendet',
      'success',
    );
  }

  sendPush(res?: any) {
    this.firebaseService.sendPush(
      {
        title: this.title,
        body: this.body,
        image: this.type === PushType.AUSGABE
          ? this.ausgabe?.imageUrl
          : this.type === PushType.IMPULSE ? this.impulse?.postImg.source_url : res?.url,
      },
      this.type === PushType.AUSGABE
        ? { ausgabe: this.ausgabe.id.toString() }
        : this.type === PushType.IMPULSE ? { impulse: this.impulse.id.toString() } : {},
      this.type
    );
    if (this.type === PushType.AUSGABE) {
      this.firebaseService.updateAusgabe(this.ausgabe.id.toString(), {
        pushSend: true,
      });
    }
    if (this.type === PushType.IMPULSE) {
      this.firebaseService.updateImpulse(this.impulse.id.toString(), {
        pushSend: true,
      });
    }
    this.utils.showToast(
      'Die Push Mitteilung wurde erfolgreich versendet',
      'success',
    );
    this.resetData();
  }

  resetData(): void {
    this.file = undefined;
    this.fileUploader.queue = [];
    this.title = '';
    this.body = '';
  }
}
