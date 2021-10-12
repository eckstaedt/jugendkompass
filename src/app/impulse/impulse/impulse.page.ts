import { Component, OnInit } from '@angular/core';
import { FirebasePost } from 'src/app/utils/interfaces';
import { ActivatedRoute } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

import { Network, NetworkStatus } from '@capacitor/network';
import { Share } from '@capacitor/share';
import { AnalyticsField } from 'src/app/utils/constants';
import { Storage } from '@ionic/storage';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-impulse',
  templateUrl: './impulse.page.html',
  styleUrls: ['./impulse.page.scss'],
})
export class ImpulsePage implements OnInit {
  public impulse: FirebasePost;
  public textSize = 15;
  public isAdmin: boolean = false;
  public isApp: boolean = true;
  public online: boolean = true;
  private counter: number = 0;
  private intervalId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoViewer: PhotoViewer,
    private storage: Storage,
    private firebaseService: FirebaseService,
    private utils: Utils,
  ) {}

  ngOnInit() {
    this.isApp = this.utils.isApp();
    if (this.isApp) {
      Network.addListener('networkStatusChange', (status: NetworkStatus) => {
        this.online = status.connected;
      });
    }
    this.loadData();

    this.firebaseService
      .subscribeToAdmin()
      .subscribe((isAdmin: boolean) => {
        this.isAdmin = isAdmin;
      });

    if (this.activatedRoute.snapshot?.paramMap?.get('id')) {
      this.firebaseService.incrementImpulseViews(
        this.activatedRoute.snapshot?.paramMap?.get('id'),
      );
    }
  }

  ionViewWillEnter() {
    this.storage.get('text-size').then((res: number) => {
      this.textSize = res;
    });

    this.loadData();

    this.intervalId = setInterval(() => {
      this.counter = this.counter + 1;
    }, 1000);
  }

  ionViewWillLeave() {
    this.firebaseService.incrementAnalyticsField(AnalyticsField.IMPULSE_TIME, {
      duration: this.counter,
      impulseId: this.impulse.id,
      impulseTitle: this.impulse.title,
    });
    this.counter = 0;
    clearInterval(this.intervalId);
  }

  async loadData() {
    await this.firebaseService.loadCategories();
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.impulse = await this.firebaseService.getImpulse(id);

    setTimeout(() => {
      for (const image of Array.from(
        document.querySelectorAll('img'),
      )) {
        (image as any).onclick = () => {
          this.photoViewer.show((image as any).src);
        };
      }
    }, 200);
  }

  async share() {
    await Share.share({
      title: 'Impuls teilen',
      text: this.impulse.title,
      url: `https://jugendkompass.com/tabs/impulse/${this.impulse.id}`,
      dialogTitle: 'Impuls teilen',
    });
  }

}
