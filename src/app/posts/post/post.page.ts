import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WpService } from 'src/app/services/wp.service';
import { AudioService } from 'src/app/services/audio.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Platform, ActionSheetController, IonButton, IonIcon, IonBackButton } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { viewClassName } from '@angular/compiler';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  @ViewChild('backButton', {static: false}) backButton: IonBackButton

  public post: any;
  public sound: any;
  public soundReady = false;
  public playing = false;
  favoritePosts = [];
  defaultHref = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private wp: WpService,
    private audioService: AudioService,
    private photoViewer: PhotoViewer,
    private platform: Platform,
    private actionSheetController: ActionSheetController,
    private appComponent: AppComponent,
    private storage: Storage,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.appComponent.getObservable().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.loadData();
      }
    });
  }

  async loadData() {
    this.backButton.defaultHref = this.router['routerState'].snapshot.url.search('favorites') ? 'tabs/favorites' : 'tabs/posts';
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    await this.storage.get('favoritePosts').then((res: any) => {
      if(res) this.favoritePosts = JSON.parse(res);
    });
    let isFavorite: boolean = false;
    if(this.favoritePosts) isFavorite = this.favoritePosts.find(post => post.id == id)? true : false;
    
    // if local stored favorite-post, get post information from local storage
    if (isFavorite) {
      const localPost = this.favoritePosts.find(post => post.id == id); 
      this.post = {
        ...localPost,
        isFavorite: isFavorite,
        base64Img: localPost.base64Img ? localPost.base64Img : null
      }
      if (this.post.audio) {
        this.audioService.loadNewAudio(this.post.audio, this.post.title.rendered);
      }

      if (this.platform.is('capacitor')) {

      }
      setTimeout(() => {
        for (const image of Array.from(document.querySelectorAll('.postContent img'))) {
          // (image as any).onclick = () => {
          //   this.photoViewer.show((image as any).src);
          // };
          (image as any).onclick = () => {
            this.photoViewer.show(this.post.base64Img);
          };
        }
      }, 100);
    }else {
      this.wp.getPostContent(id).then((res: any) => {
        this.post = {
          ...res.data,
          media_url: res.data._embedded['wp:featuredmedia'] ?
            res.data._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : undefined,
          isFavorite: isFavorite,
          views: res.data.views ? parseInt(res.data.views, 10) + 1 : 1
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
  }

  getBase64ImgFromUrl(imageURL: any) {
    this.httpClient.get(imageURL, {responseType: 'blob'}).subscribe(data => {
      if(data){
        let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.addEventListener("load", () => {
          return reader.result;
        }, false);
      } 
    }).unsubscribe();
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
    if(!this.post.isFavorite){
      this.post.isFavorite = true;
      if(this.post.media_url) this.post.base64Img = this.getBase64ImgFromUrl(this.post.media_url);
      this.favoritePosts.push(this.post);
      this.storage.set('favoritePosts', JSON.stringify(this.favoritePosts));
    } else {
      this.post.isFavorite = false;
      this.favoritePosts = this.favoritePosts.filter(post => post.id != this.post.id);
      this.storage.set('favoritePosts', JSON.stringify(this.favoritePosts));
    }
  }
}
