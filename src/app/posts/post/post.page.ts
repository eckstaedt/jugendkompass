import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {
  Platform,
  ActionSheetController,
  IonBackButton,
  ToastController,
  AlertController,
  LoadingController
} from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Storage } from '@ionic/storage';
import { Category, FirebasePost } from 'src/app/utils/interfaces';
import { RouterService } from 'src/app/services/router.service';
import { Plugins } from '@capacitor/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AnalyticsField } from 'src/app/utils/constants';
import { Howl } from 'howler';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { Utils } from 'src/app/utils/utils';
const { Browser, Share } = Plugins;

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  @ViewChild('backButton') backButton: IonBackButton;

  private file: FileLikeObject;
  public post: FirebasePost;
  public sound: any;
  public soundReady = false;
  public playing = false;
  favoritePosts: FirebasePost[] = [];
  defaultHref: string = '';
  public textSize = 15;
  public isAdmin: boolean = false;
  public fileUploader: FileUploader = new FileUploader({});
  public isLoading: boolean = false;

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
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private utils: Utils
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
    if (this.favoritePosts) {
      isFavorite = Boolean(
        this.favoritePosts.find(post => post.id.toString() === id),
      );
    }

    // if local stored favorite-post, get post information from local storage
    if (isFavorite) {
      const localPost: FirebasePost = this.favoritePosts.find(
        post => post.id.toString() == id,
      );
      this.post = {
        ...localPost,
        isFavorite: true,
      };

      if (this.post.audio?.base64) {
        this.audioService.loadNewAudio(
          this.post.audio.base64,
          this.post.title,
        );
      }
    } else {
      this.post = await this.firebaseService.getPost(id);
      this.post.articleWasRead = true;
      if (this.post.audio) {
        this.audioService.loadNewAudio(
          this.post.audio.url,
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
    }, 200);
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

  async setPostFavorite() {
    if (!this.post.isFavorite) {
      this.isLoading = true;
      this.post.isFavorite = true;
      if (this.post.postImg && !this.post.postImg.source_url.startsWith('data')) {
        await this.firebaseService
          .getBase64FromUrl(this.post.postImg.source_url)
          .then((res: string) => (this.post.base64Img = res));
      }
      for (const image of Array.from(
        document.querySelectorAll('.postContent img'),
      )) {
        const imageSrc: string = (image as HTMLImageElement).src;
        if (imageSrc.startsWith('data')) {
          const base64: any = await this.firebaseService.getBase64FromUrl(imageSrc);
          this.post.content = this.post.content.replace(
            imageSrc,
            base64,
          );
        }
      }

      if(this.post.audio){
        this.post.audio.base64 = await this.firebaseService.getBase64FromUrl(this.post.audio.url, false) as string;
      }
      this.isLoading = false;
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

  async onAudioSelected() {
    if (this.fileUploader.queue && this.fileUploader.queue.length !== 0) {
      const file: FileLikeObject = this.fileUploader.queue[this.fileUploader.queue.length - 1].file;
      this.file = file;
      this.openConfirmAudioUploadDialog();
    }
  }

  async openConfirmAudioUploadDialog() {
    const alert = await this.alertController.create({
      header: 'Audioupload',
      message: `Möchtest du die Audiodatei (${this.file.name}) für diesen Artikel hochladen?`,
      buttons: [{
        text: 'Ja',
        handler: async () => {
          const loading  = await this.loadingController.create();
          loading.present();
          this.firebaseService.uploadAudio(this.file, this.post).then(async (res: any) => {
            const sound = new Howl({
              html5: true,
              src: [res.url],
              preload: true
            });
            sound.on('load', () => {
              const audio: any = {
                ...res,
                duration: this.utils.getMinString(Math.round(sound.duration()))
              };
      
              this.firebaseService.updatePost(this.post.id, {
                audio: audio
              }).then(async () => {
                this.post.audio = audio;
                this.audioService.loadNewAudio(
                  this.post.audio.url,
                  this.post.title,
                );
                loading.dismiss();
                const toast = await this.toastController.create({
                  duration: 3000,
                  color: 'success',
                  message: 'Datei erfolgreich hochgeladen!'
                });
                toast.present();
              }).catch(async () => {
                loading.dismiss();
                const toast = await this.toastController.create({
                  duration: 3000,
                  color: 'danger',
                  message: 'Die Datei konnte nicht hochgeladen werden!'
                });
                toast.present();
              });
            });
          }).catch(() => {
            loading.dismiss();
          });
        }
      }, {
        text: 'Abbrechen'
      }]
    })

    await alert.present();
  }
}
