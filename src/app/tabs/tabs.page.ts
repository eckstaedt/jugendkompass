import { Component } from '@angular/core';
import { AudioService } from '../services/audio/audio.service';
import { Utils } from '../utils/utils';
import { ModalController } from '@ionic/angular';
import { AudioModalPage } from '../audio-modal/audio-modal.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  online: boolean = true;
  isApp: boolean = true;
  playing: boolean = false;

  constructor(
    private audioService: AudioService,
    private utils: Utils,
    private modalController: ModalController,
  ) {
    this.isApp = this.utils.isApp();
    this.audioService.onTitleChange().subscribe((title: string) => {
      this.playing = Boolean(title);
    });
  }

  async openAudioModal() {
    const modal = await this.modalController.create({
      component: AudioModalPage,
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.75],
      cssClass: "playModal"
    });
    return await modal.present();
  }
}
