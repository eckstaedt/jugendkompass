import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Ausgabe } from 'src/app/utils/interfaces';
import { Storage } from '@ionic/storage';

import { Plugins, FilesystemDirectory } from '@capacitor/core';
import { Platform, LoadingController } from '@ionic/angular';
import * as PluginsLibrary from 'capacitor-video-player';
import { HttpEventType } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
const { CapacitorVideoPlayer } = Plugins;
import { writeFile } from 'capacitor-blob-writer'
import { AnalyticsField } from 'src/app/utils/constants';

@Component({
  selector: 'app-ausgabe',
  templateUrl: './ausgabe.page.html',
  styleUrls: ['./ausgabe.page.scss'],
})
export class AusgabePage implements OnInit {
  public textSize: number = 15;
  public ausgabe: Ausgabe;
  private videoPlayer: any;

  constructor(
    private platform: Platform,
    private appComponent: AppComponent,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private fileOpener: FileOpener,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.appComponent.getObservable().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.loadData();
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
    await this.videoPlayer.initPlayer({
      mode: 'fullscreen',
      url: video.url,
      playerId: 'fullscreen',
      componentTag: 'app-ausgabe'
    });
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

          this.fileOpener.open(uri, 'application/pdf')
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
}
