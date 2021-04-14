import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {
  Platform,
  ActionSheetController,
  IonBackButton,
  ToastController
} from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Storage } from '@ionic/storage';
import { Category, FirebasePost } from 'src/app/utils/interfaces';
import { RouterService } from 'src/app/services/router.service';
import { Plugins } from '@capacitor/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AnalyticsField } from 'src/app/utils/constants';
import { AngularFireStorage } from '@angular/fire/storage';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
const { Browser, Share } = Plugins;

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  @ViewChild('backButton') backButton: IonBackButton;

  public post: FirebasePost;
  public sound: any;
  public soundReady = false;
  public playing = false;
  favoritePosts: FirebasePost[] = [];
  defaultHref: string = '';
  public textSize = 15;
  public isAdmin: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private audioService: AudioService,
    private photoViewer: PhotoViewer,
    private platform: Platform,
    private actionSheetController: ActionSheetController,
    private appComponent: AppComponent,
    private storage: Storage,
    private routerService: RouterService,
    private firebaseService: FirebaseService,
    private fireStorage: AngularFireStorage,
    private toastController: ToastController,
    private file: File,
    private fileChooser: FileChooser
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

  ionViewWillEnter() {
    this.defaultHref = Boolean(
      this.router['routerState'].snapshot.url.search('favorites') > -1,
    )
      ? '/tabs/favorites'
      : '/tabs/posts';

    this.storage.get('text-size').then((res: number) => {
      this.textSize = res;
    });
  }

  async setDivStyle() {
    var fontSize = 15;

    await this.storage.get('text-size').then((res: number) => {
      fontSize = res;
    });

    return {
      'font-size': fontSize + 'px',
    };
  }

  async loadData() {
    await this.firebaseService.loadCategories();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    await this.storage.get('favoritePosts').then((res: any) => {
      if (res) this.favoritePosts = JSON.parse(res);
    });
    let isFavorite: boolean = false;
    if (this.favoritePosts)
      isFavorite = Boolean(
        this.favoritePosts.find(post => post.id.toString() === id),
      );

    // if local stored favorite-post, get post information from local storage
    if (isFavorite) {
      const localPost: FirebasePost = this.favoritePosts.find(
        post => post.id.toString() == id,
      );
      this.post = { ...localPost };

      if (this.post.base64Audio) {
        this.audioService.loadNewAudio(
          this.post.base64Audio,
          this.post.title,
        );
      }
    } else {
      this.post = await this.firebaseService.getPost(id);
      if (this.post.audio) {
        this.audioService.loadNewAudio(
          this.post.audio,
          this.post.title,
        );
      }
    }

    this.firebaseService.incrementPostViews(id);

    setTimeout(() => {
      for (const image of Array.from(
        document.querySelectorAll('.postContent img'),
      )) {
        (image as any).onclick = () => {
          this.photoViewer.show((image as any).src);
        };
      }
    }, 100);
  }

  async openMenu() {
    const actionButtons: any[] = [
      {
        text: 'Artikel teilen',
        handler: async () => {
          if (this.platform.is('capacitor')) {
            await Share.share({
              title: 'Artikel teilen',
              text: this.post.title,
              url: this.post.link,
              dialogTitle: 'Artikel teilen',
            });
          } else {
            window.open(this.post.link, '_blank');
          }
        },
      },
      {
        text: 'Artikel im Browser aufrufen',
        handler: async () => {
          await Browser.open({
            url: this.post.link,
          });
        },
      },
    ];

    if (this.post.pdf) {
      actionButtons.push({
        text: 'Artikel als PDF anzeigen',
        handler: async () => {
          await Browser.open({
            url: this.post.pdf,
          });
        },
      });
    }

    actionButtons.push({
      role: 'destructive',
      text: 'Abbrechen',
    });

    const sheet = await this.actionSheetController.create({
      buttons: actionButtons,
    });

    await sheet.present();
  }

  play() {
    this.audioService.playNew();
    this.firebaseService.incrementAudioPlays(this.post.id);
  }

  files = [];
  uploadProgress = 0;

  async addAudioToPost() {
    this.fileChooser.open()
      .then(async uri => {
        this.file.resolveLocalFilesystemUrl(uri)
          .then(async f => {
            const path = uri.substr(0, uri.lastIndexOf('/') + 1);

            const toast = await this.toastController.create({
              duration: 3000,
              message: 'Pfad: ' + path
            });
            toast.present();

            const type = this.getMimeType(f.name.split('.').pop());
            const buffer = await this.file.readAsArrayBuffer(path, f.name);
            const fileBlob = new Blob([buffer], type);

            const randomId = Math.random()
              .toString(36)
              .substring(2, 8);

            const uploadTask = this.fireStorage.upload(
              `audios/${new Date().getTime()}_${randomId}`,
              fileBlob
            );

            uploadTask.percentageChanges().subscribe(change => {
              this.uploadProgress = change;
            });

            uploadTask.then(async res => {
              const toast = await this.toastController.create({
                duration: 3000,
                message: 'File upload finished!'
              });
              toast.present();
            });

            /*(<FileEntry>entry).file(file => {
              const type = this.getMimeType(uri.split('.').pop());
              const buffer = await this.file.readAsArrayBuffer(uri, uri);
              const fileBlob = new Blob([buffer], type);

              const randomId = Math.random()
                .toString(36)
                .substring(2, 8);

              const toast = await this.toastController.create({
                duration: 3000,
                message: 'Start Upload'
              });
              toast.present();
              const uploadTask = this.fireStorage.upload(
                `audios/${new Date().getTime()}_${randomId}`,
                fileBlob
              );

              uploadTask.percentageChanges().subscribe(change => {
                this.uploadProgress = change;
              });

              uploadTask.then(async res => {
                const toast = await this.toastController.create({
                  duration: 3000,
                  message: 'Datei erfolgreich hochgeladen!'
                });
                toast.present();
              });
            }
            );*/
          })
          .catch(err => {
            console.log('Error while reading file.');
          });

      })
      .catch(async e => {
        const toast = await this.toastController.create({
          duration: 3000,
          message: 'Fehler:' + e
        });
        toast.present();
      });
  }

  getMimeType(fileExt) {
    if (fileExt == 'mp3') return { type: 'audio/mp3' };
    else if (fileExt == 'wav') return { type: 'audio/wav' };
    else if (fileExt == 'jpg') return { type: 'image/jpg' };
    else if (fileExt == 'mp4') return { type: 'video/mp4' };
    else if (fileExt == 'MOV') return { type: 'video/quicktime' };
  }

  async setPostFavorite() {
    if (!this.post.isFavorite) {
      this.post.isFavorite = true;
      if (this.post.postImg && !this.post.postImg.source_url.startsWith('data')) {
        await this.firebaseService
          .getBase64ImgFromUrl(this.post.postImg.source_url)
          .then((res: string) => (this.post.base64Img = res));
      }
      for (const image of Array.from(
        document.querySelectorAll('.postContent img'),
      )) {
        const imageSrc: string = (image as HTMLImageElement).src;
        if (imageSrc.startsWith('data')) {
          const base64: any = await this.firebaseService.getBase64ImgFromUrl(imageSrc);
          this.post.content = this.post.content.replace(
            imageSrc,
            base64,
          );
        }
      }
      // CORS-Problem muss gelöst werden,
      // dann funktioniert das Speichern von Audio-dateien
      // in Favoriten mit dem unten stehenden Code
      // if(this.post.audio && this.post.audio !== ''){
      //   this.post.base64Audio = await this.wp.getBase64FromUrl(this.post.audio);
      // }
      this.favoritePosts.push(this.post);
      this.storage.set('favoritePosts', JSON.stringify(this.favoritePosts));
      this.firebaseService.incrementAnalyticsField(AnalyticsField.FAVORITE_ADDED);
    } else {
      this.post.isFavorite = false;
      this.post.base64Img = null;
      this.favoritePosts = this.favoritePosts.filter(
        post => post.id != this.post.id,
      );
      if (this.favoritePosts) {
        this.storage.set('favoritePosts', JSON.stringify(this.favoritePosts));
      }
      this.firebaseService.incrementAnalyticsField(AnalyticsField.FAVORITE_REMOVED);
    }
  }

  openFilteredList(category: Category): void {
    this.routerService.setData(category);
    this.router.navigateByUrl('tabs/posts');
  }
}
