import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WpService } from 'src/app/services/wp.service';
import { AudioService } from 'src/app/services/audio.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {
  Platform,
  ActionSheetController,
  IonButton,
  IonIcon,
  IonBackButton,
} from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Storage } from '@ionic/storage';
import { Post, CategoryData, Category } from 'src/app/utils/interfaces';
import { Utils } from 'src/app/utils/utils';
import { RouterService } from 'src/app/services/router.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  @ViewChild('backButton') backButton: IonBackButton;

  public post: Post;
  public sound: any;
  public soundReady = false;
  public playing = false;
  favoritePosts: Post[] = [];
  defaultHref: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private wp: WpService,
    private audioService: AudioService,
    private photoViewer: PhotoViewer,
    private actionSheetController: ActionSheetController,
    private appComponent: AppComponent,
    private storage: Storage,
    private utils: Utils,
    private routerService: RouterService,
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
  }

  async loadData() {
    await this.wp.getCategories();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    await this.storage.get('favoritePosts').then((res: any) => {
      if (res) this.favoritePosts = JSON.parse(res);
    });
    let isFavorite: boolean = false;
    if (this.favoritePosts)
      isFavorite = Boolean(this.favoritePosts.find(post => post.id.toString() === id));

    // if local stored favorite-post, get post information from local storage
    if (isFavorite) {
      const localPost: Post = this.favoritePosts.find(
        post => post.id.toString() == id,
      );
      this.post = { ...localPost };

      if (this.post.base64Audio) {
        this.audioService.loadNewAudio(
          this.post.base64Audio,
          this.post.title.rendered,
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
      this.wp.getPostContent(id).then((res: any) => {
        const categoryData: CategoryData = this.utils.getCategoryData(
          res.data,
          this.wp.getRubriken(),
          this.wp.getAusgaben(),
        );
        this.post = {
          ...res.data,
          media_url: res.data._embedded['wp:featuredmedia']
            ? res.data._embedded['wp:featuredmedia'][0].media_details.sizes
                .medium.source_url
            : undefined,
          isFavorite: isFavorite,
          rubrik: categoryData.rubrik,
          ausgabe: categoryData.ausgabe,
          views: res.data.views ? parseInt(res.data.views, 10) + 1 : 1,
        };

        if (this.post.audio) {
          this.audioService.loadNewAudio(
            this.post.audio,
            this.post.title.rendered,
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
      });
    }
  }

  async openMenu() {
    const actionButtons: any[] = [
      {
        text: 'Artikel im Browser aufrufen',
        handler: () => {
          window.open(this.post.link, '_blank');
        },
      },
    ];

    if (this.post.pdf) {
      actionButtons.push({
        text: 'Artikel als PDF anzeigen',
        handler: () => {
          window.open(this.post.pdf, '_blank');
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
      if (this.post.media_url && !this.post.media_url.startsWith('data')) {
        await this.wp.getBase64FromUrl(this.post.media_url)
          .then((res: string) => (this.post.base64Img = res));
      }
      for (const image of Array.from(
        document.querySelectorAll('.postContent img'),
      )) {
        const imageSrc: string = (image as HTMLImageElement).src;
        if (imageSrc.startsWith('data')) {
          const base64: string = await this.wp.getBase64FromUrl(imageSrc);
          this.post.content.rendered = this.post.content.rendered.replace(
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
