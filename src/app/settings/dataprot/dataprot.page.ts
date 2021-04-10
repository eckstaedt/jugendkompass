import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { WpService } from 'src/app/services/wp.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dataprot',
  templateUrl: './dataprot.page.html',
  styleUrls: ['./dataprot.page.scss'],
})
export class DataprotPage implements OnInit {
  public dataProt: any;

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

    this.wp.getPageContent(environment.dataProdPageId).then((dataProt: any) => {
      this.dataProt = dataProt;
      loading.dismiss();
    });
  }
}
