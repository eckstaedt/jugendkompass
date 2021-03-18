import { Component, OnInit } from '@angular/core';
import { WpService } from 'src/app/services/wp.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.page.html',
  styleUrls: ['./imprint.page.scss'],
})
export class ImprintPage implements OnInit {
  public imprint: any;

  constructor(
    private wp: WpService,
    private loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.getImprint();
  }

  async getImprint() {
    const loading = await this.loadingController.create({
      message: '',
    });
    await loading.present();

    this.wp.getPageContent('24').then((imprint: any) => {
      this.imprint = imprint;
      loading.dismiss();
    });
  }
}
