import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Ausgabe } from 'src/app/utils/interfaces';
import { Storage } from '@ionic/storage';

import { Plugins, FilesystemDirectory } from '@capacitor/core';
import { Platform, LoadingController, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import * as PluginsLibrary from 'capacitor-video-player';
import { HttpEventType } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
const { CapacitorVideoPlayer } = Plugins;
import { writeFile } from 'capacitor-blob-writer'
import { AnalyticsField } from 'src/app/utils/constants';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { AudioService } from 'src/app/services/audio/audio.service';

@Component({
  selector: 'app-ausgabe',
  templateUrl: './ausgabe.page.html',
  styleUrls: ['./ausgabe.page.scss'],
})
export class AusgabePage implements OnInit {
  public textSize: number = 15;
  public ausgabe: Ausgabe;
  private videoPlayer: any;
  public isAdmin: boolean = false;
  private file: FileLikeObject;
  private file2: FileLikeObject;
  public fileUploader: FileUploader = new FileUploader({});
  private uploadItem: string;
  public editMode: boolean = false;

  constructor(
    private platform: Platform,
    private appComponent: AppComponent,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private fileOpener: FileOpener,
    private loadingController: LoadingController,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController,
    private audioService: AudioService
  ) { }

  ngOnInit() {
    this.appComponent.getObservable().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.loadData();

        this.firebaseService.subscribeToAdmin().subscribe((isAdmin: boolean) => {
          this.isAdmin = isAdmin;
        });
      }
    });
  }

  ngAfterViewInit() {
    if (this.platform.is('capacitor')) {
      this.videoPlayer = CapacitorVideoPlayer;
    } else {
      this.videoPlayer = PluginsLibrary.CapacitorVideoPlayer
    }
  }

  async playVideo(video: any) {
    this.audioService.pause();
    const data: any = {
      mode: 'fullscreen',
      url: video.url,
      subtitle: null,
      playerId: 'fullscreen',
      componentTag: 'app-ausgabe'
    };
    await this.videoPlayer.initPlayer(data);
    this.firebaseService.incrementAnalyticsField(AnalyticsField.VIDEO_PLAYED, {
      ausgabe: this.ausgabe.id,
      ausgabenName: this.ausgabe.name,
      video: video.name
    });
  }

  ionViewWillEnter() {
    this.storage.get('text-size').then((res: number) => {
      this.textSize = res;
    });
  }

  ionViewWillLeave() {
    this.editMode = false;
  }

  async loadData() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    await this.firebaseService.loadCategories();
    this.ausgabe = this.firebaseService.getAusgabe(id);
  }

  async downloadPdf() {
    if (this.platform.is('capacitor')) {
      const loading: any = await this.loadingController.create();
      loading.present();
      this.firebaseService.downloadFile(this.ausgabe.pdfUrl).subscribe(async (event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          // console.log(Math.round((100 * event.loaded) / event.total));
        } else if (event.type === HttpEventType.Response) {
          const { uri } = await writeFile({
            path: this.ausgabe.name.replace('.', '-') + '.pdf',
            directory: FilesystemDirectory.Data,
            data: event.body,
            recursive: true
          });

          loading.dismiss();

          this.firebaseService.incrementAnalyticsField(AnalyticsField.PDF_DOWNLOADED, {
            ausgabe: this.ausgabe.id,
            ausgabenName: this.ausgabe.name
          });

          this.fileOpener.open(uri, 'application/pdf');
        }
      });
    } else {
      window.open(this.ausgabe.pdfUrl, '_blank');
      this.firebaseService.incrementAnalyticsField(AnalyticsField.PDF_DOWNLOADED, {
        ausgabe: this.ausgabe.id,
        ausgabenName: this.ausgabe.name
      });
    }
  }

  async onUploadBtnClick(selector: HTMLInputElement) {
    const actionSheet: HTMLIonActionSheetElement = await this.actionSheetController.create({
      buttons: [{
        text: 'Cover uploaden',
        handler: () => {
          this.uploadItem = 'cover';
          selector.accept = 'image/png, image/jpeg';
          selector.multiple = false;
          selector.click();
        }
      }, {
        text: 'PDF uploaden',
        handler: () => {
          this.uploadItem = 'pdf';
          selector.accept = 'application/pdf';
          selector.multiple = false;
          selector.click();
        }
      }, {
        text: 'Video uploaden',
        handler: () => {
          this.uploadItem = 'video';
          selector.accept = 'video/mp4, image/png, image/jpeg';
          selector.multiple = true;
          selector.click();
        }
      }, {
        text: 'Vorwort anpassen',
        handler: () => {
          this.editMode = true;
        }
      }, {
        text: 'Abbrechen'
      }]
    });

    await actionSheet.present();
  }

  async onFileSelected() {
    if (this.fileUploader.queue && this.fileUploader.queue.length !== 0) {
      if (this.uploadItem === 'video') {
        if (this.fileUploader.queue.length === 2) {
          if (this.fileUploader.queue[0].file.type === 'video/mp4' && this.fileUploader.queue[1].file.type !== 'video/mp4') {
            this.file = this.fileUploader.queue[0].file;
            this.file2 = this.fileUploader.queue[1].file;
            this.openConfirmVideoUploadDialog();
          } else if (this.fileUploader.queue[1].file.type === 'video/mp4' && this.fileUploader.queue[0].file.type !== 'video/mp4') {
            this.file2 = this.fileUploader.queue[0].file;
            this.file = this.fileUploader.queue[1].file;
            this.openConfirmVideoUploadDialog();
          } else {
            this.showVideoUploadError();
            this.fileUploader.queue = [];
            return;
          }
        } else {
          this.showVideoUploadError();
          this.fileUploader.queue = [];
          return;
        }
      } else if (this.uploadItem === 'cover') {
        const file: FileLikeObject = this.fileUploader.queue[this.fileUploader.queue.length - 1].file;
        if (file.size > 300000) {
          this.showCoverUploadError();
          this.fileUploader.queue = [];
        } else {
          this.file = file;
          this.openConfirmCoverUploadDialog();
        }
      } else {
        const file: FileLikeObject = this.fileUploader.queue[this.fileUploader.queue.length - 1].file;
        this.file = file;
        this.openConfirmPdfUploadDialog();
      }
    }
  }

  async showVideoUploadError() {
    const toast = await this.toastController.create({
      duration: 3000,
      message: 'Wähle ein Video und das Frontbild dazu aus...',
      color: 'danger'
    });
    toast.present();
  }

  async showCoverUploadError() {
    const toast = await this.toastController.create({
      duration: 3000,
      message: 'Wähle ein Cover mit maximal 300kb aus',
      color: 'danger'
    });
    toast.present();
  }

  async openConfirmPdfUploadDialog() {
    const alert = await this.alertController.create({
      header: 'PDF-Upload',
      message: `Möchtest du die PDF-Datei (${this.file.name}) für diese Ausgabe hochladen?`,
      buttons: [{
        text: 'Ja',
        handler: async () => {
          const loading  = await this.loadingController.create();
          loading.present();
          this.firebaseService.uploadPdf(this.file).then(async (res: any) => {
            this.firebaseService.updateAusgabe(this.ausgabe.id.toString(), {
              pdfUrl: res.url,
              pdfPath: res.path
            }).then(async () => {
              this.ausgabe.pdfUrl = res.url;
              loading.dismiss();
              this.fileUploader.queue = [];
              const toast = await this.toastController.create({
                duration: 3000,
                color: 'success',
                message: 'Pdf erfolgreich hochgeladen!'
              });
              toast.present();
            }).catch(async () => {
              loading.dismiss();
              this.fileUploader.queue = [];
              const toast = await this.toastController.create({
                duration: 3000,
                color: 'danger',
                message: 'Die Pdf konnte nicht hochgeladen werden!'
              });
              toast.present();
            });
          }).catch(() => {
            loading.dismiss();
            this.fileUploader.queue = [];
          });
        }
      }, {
        text: 'Abbrechen'
      }]
    })

    await alert.present();
  }

  async openConfirmCoverUploadDialog() {
    const alert = await this.alertController.create({
      header: 'Cover-Upload',
      message: `Möchtest du die Cover-Datei (${this.file.name}) für diese Ausgabe hochladen?`,
      buttons: [{
        text: 'Ja',
        handler: async () => {
          const loading  = await this.loadingController.create();
          loading.present();
          this.firebaseService.uploadPdf(this.file).then(async (res: any) => {
            this.firebaseService.updateAusgabe(this.ausgabe.id.toString(), {
              imageUrl: res.url,
              imagePath: res.path,
            }).then(async () => {
              this.ausgabe.imageUrl = res.url;
              this.ausgabe.imagePath = res.path;
              loading.dismiss();
              this.fileUploader.queue = [];
              const toast = await this.toastController.create({
                duration: 3000,
                color: 'success',
                message: 'Das Cover wurde erfolgreich hochgeladen!'
              });
              toast.present();
            }).catch(async () => {
              loading.dismiss();
              this.fileUploader.queue = [];
              const toast = await this.toastController.create({
                duration: 3000,
                color: 'danger',
                message: 'Das Cover konnte nicht hochgeladen werden!'
              });
              toast.present();
            });
          }).catch(() => {
            loading.dismiss();
            this.fileUploader.queue = [];
          });
        }
      }, {
        text: 'Abbrechen'
      }]
    })

    await alert.present();
  }

  async openConfirmVideoUploadDialog() {
    const alert = await this.alertController.create({
      header: 'Video-Upload',
      inputs: [{
        name: 'name',
        type: 'text',
        placeholder: 'Videoname'
      }],
      message: `Möchtest du das Video (${this.file.name}) inklusive dem Foto (${this.file2.name}) für diese Ausgabe hochladen?`,
      buttons: [{
        text: 'Ja',
        handler: async (event: any) => {
          const loading  = await this.loadingController.create();
          loading.present();
          this.firebaseService.uploadVideoFile(this.file).then(async (resVideo: any) => {
            this.firebaseService.uploadVideoFile(this.file2).then(async (resVideoImage: any) => {
              if (!this.ausgabe.videos) {
                this.ausgabe.videos = [];
              }
              this.ausgabe.videos.push({
                image: resVideoImage.url,
                imagePath: resVideoImage.path,
                url: resVideo.url,
                videoPath: resVideo.path,
                name: event.name
              });
              this.firebaseService.updateAusgabe(this.ausgabe.id.toString(), {
                videos: this.ausgabe.videos
              }).then(async () => {
                loading.dismiss();
                this.fileUploader.queue = [];
                const toast = await this.toastController.create({
                  duration: 3000,
                  color: 'success',
                  message: 'Video erfolgreich hochgeladen!'
                });
                toast.present();
              }).catch(async () => {
                loading.dismiss();
                this.fileUploader.queue = [];
                const toast = await this.toastController.create({
                  duration: 3000,
                  color: 'danger',
                  message: 'Das Video konnte nicht hochgeladen werden!'
                });
                toast.present();
              });
            }).catch(() => {
              loading.dismiss();
              this.fileUploader.queue = [];
            });
          }).catch(() => {
            loading.dismiss();
            this.fileUploader.queue = [];
          });
        }
      }, {
        text: 'Abbrechen'
      }]
    })

    await alert.present();
  }

  saveVorwort() {
    this.firebaseService.updateAusgabe(this.ausgabe.id.toString(), {
      title: this.ausgabe.title,
      content: this.ausgabe.content
    }).then(async () => {
      this.editMode = false;
      const toast = await this.toastController.create({
        duration: 3000,
        color: 'success',
        message: 'Das Vorwort wurde erfolgreich aktualisiert!'
      });
      toast.present();
    }).catch(async () => {
      this.editMode = false;
      const toast = await this.toastController.create({
        duration: 3000,
        color: 'danger',
        message: 'Das Vorwort konnte nicht aktualisiert werden!'
      });
      toast.present();
    });
  }
}
