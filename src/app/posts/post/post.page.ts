import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpService } from 'src/app/services/wp.service';
import { AudioService } from 'src/app/services/audio.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Platform, ActionSheetController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  public post: any;
  public sound: any;
  public soundReady = false;
  public playing = false;
  favoritePostIds = [];
  favoritePosts = [];
  defaultHref = '';

  constructor(
    private route: ActivatedRoute,
    private wp: WpService,
    private audioService: AudioService,
    private photoViewer: PhotoViewer,
    private platform: Platform,
    private actionSheetController: ActionSheetController,
    private appComponent: AppComponent,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.appComponent.getObservable().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.loadData();
      }
    });
  }

  loadData() {
    this.storage.get('favoritePostIds').then((res: any) => {
      if(res) this.favoritePostIds = JSON.parse(res);
    });
    this.storage.get('favoritePosts').then((res: any) => {
      if(res) this.favoritePosts = JSON.parse(res);
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.wp.getPostContent(id).then((res: any) => {
      let isFavorite: boolean = false;
      if(this.favoritePostIds) isFavorite = this.favoritePostIds.includes(+id);
      this.post = {
        ...res.data,
        media_url: res.data._embedded['wp:featuredmedia'] ?
          res.data._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : undefined,
        isFavorite: isFavorite
      };

      if (this.post.audio) {
        this.audioService.loadNewAudio(this.post.audio, this.post.title.rendered);
      }

      if (this.platform.is('capacitor')) {

      }
      setTimeout(() => {
        for (const image of Array.from(document.querySelectorAll('.postContent img'))) {
          (image as any).onclick = () => {
            this.photoViewer.show((image as any).src);
          };
        }
      }, 100);
    });
  }

  async openMenu() {
    const actionButtons: any[] = [{
      text: 'Artikel im Browser aufrufen',
      handler: () => {
        window.open(this.post.link, '_blank');
      }
    }];

    if (this.post.pdf) {
      actionButtons.push({
        text: 'Artikel als PDF anzeigen',
        handler: () => {
          window.open(this.post.pdf, '_blank');
        }
      });
    }

    actionButtons.push({
      role: 'destructive',
      text: 'Abbrechen'
    });

    const sheet = await this.actionSheetController.create({
      buttons: actionButtons
    });

    await sheet.present();
  }

  play() {
    this.audioService.playNew();
  }

  setPostFavorite() {
    if(!this.favoritePostIds.includes(this.post.id)){
      this.post.isFavorite = true;
      this.favoritePostIds.push(this.post.id);
      this.storage.set('favoritePostIds', JSON.stringify(this.favoritePostIds));
      this.favoritePosts.push(this.post);
      console.log(this.favoritePosts);
      this.storage.set('favoritePosts', JSON.stringify(this.favoritePosts));
    } else {
      this.post.isFavorite = false;
      this.favoritePostIds = this.favoritePostIds.filter(postId => postId != this.post.id);
      this.storage.set('favoritePostIds', JSON.stringify(this.favoritePostIds));
      this.favoritePosts = this.favoritePosts.filter(post => post.id != this.post.id);
      console.log(this.favoritePosts);
      this.storage.set('favoritePosts', JSON.stringify(this.favoritePosts));
    }
  }
}
