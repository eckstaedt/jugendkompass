import { Component, OnInit } from '@angular/core';
import { FirebasePost } from 'src/app/utils/interfaces';
import { ActivatedRoute } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AppComponent } from 'src/app/app.component';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

import { Plugins, NetworkStatus } from '@capacitor/core';
import { AnalyticsField } from 'src/app/utils/constants';
import { Storage } from '@ionic/storage';

const { Network } = Plugins;

@Component({
  selector: 'app-impulse',
  templateUrl: './impulse.page.html',
  styleUrls: ['./impulse.page.scss'],
})
export class ImpulsePage implements OnInit {
  public impulse: FirebasePost;
  public textSize = 15;
  public isAdmin: boolean = false;
  public online: boolean = true;
  private counter: number = 0;
  private intervalId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoViewer: PhotoViewer,
    private appComponent: AppComponent,
    private storage: Storage,
    private firebaseService: FirebaseService,
  ) {}

  ngOnInit() {
    Network.addListener('networkStatusChange', (status: NetworkStatus) => {
      this.online = status.connected;
    });
    this.appComponent.getObservable().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.loadData();

        this.firebaseService
          .subscribeToAdmin()
          .subscribe((isAdmin: boolean) => {
            this.isAdmin = isAdmin;
          });
      }
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

}
