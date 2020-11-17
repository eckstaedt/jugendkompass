import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpService } from 'src/app/services/wp.service';
import { AudioService } from 'src/app/services/audio.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Platform, ActionSheetController } from '@ionic/angular';

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

  constructor(
    private route: ActivatedRoute,
    private wp: WpService,
    private audioService: AudioService,
    private photoViewer: PhotoViewer,
    private platform: Platform,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.wp.getPostContent(id).then((res: any) => {
      this.post = {
        ...res.data,
        media_url: res.data._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
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
}
