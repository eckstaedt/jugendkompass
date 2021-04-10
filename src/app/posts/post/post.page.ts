import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AudioService } from 'src/app/services/audio.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {
  Platform,
  ActionSheetController,
  IonBackButton,
} from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Storage } from '@ionic/storage';
import { Category, FirebasePost } from 'src/app/utils/interfaces';
import { Utils } from 'src/app/utils/utils';
import { RouterService } from 'src/app/services/router.service';
import { Plugins } from '@capacitor/core';
import { FirebaseService } from 'src/app/services/firebase.service';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private audioService: AudioService,
    private photoViewer: PhotoViewer,
    private platform: Platform,
    private actionSheetController: ActionSheetController,
    private appComponent: AppComponent,
    private storage: Storage,
    private utils: Utils,
    private routerService: RouterService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.appComponent.getObservable().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.loadData();
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

      setTimeout(() => {
        for (const image of Array.from(
          document.querySelectorAll('.postContent img'),
        )) {
          (image as any).onclick = () => {
            this.photoViewer.show((image as any).src);
          };
        }
      }, 100);
    } else {
      this.post = await this.firebaseService.getPost(id);
      if (this.post.audio) {
        this.audioService.loadNewAudio(
          this.post.audio,
          this.post.title,
        );
      }

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
  }

  async setPostFavorite() {
    if (!this.post.isFavorite) {
      this.post.isFavorite = true;
      if (this.post.postImg && !this.post.postImg.source_url.startsWith('data')) {
        await this.firebaseService
          .getBase64FromUrl(this.post.postImg)
          .then((res: string) => (this.post.base64Img = res));
      }
      for (const image of Array.from(
        document.querySelectorAll('.postContent img'),
      )) {
        const imageSrc: string = (image as HTMLImageElement).src;
        if (imageSrc.startsWith('data')) {
          const base64: string = await this.firebaseService.getBase64FromUrl(imageSrc);
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
    } else {
      this.post.isFavorite = false;
      this.post.base64Img = null;
      this.favoritePosts = this.favoritePosts.filter(
        post => post.id != this.post.id,
      );
      if (this.favoritePosts)
        this.storage.set('favoritePosts', JSON.stringify(this.favoritePosts));
    }
  }

  openFilteredList(category: Category): void {
    this.routerService.setData(category);
    this.router.navigateByUrl('tabs/posts');
  }
}
