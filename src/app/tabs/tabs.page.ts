import { Component, ViewChild } from '@angular/core';
import { AudioService } from '../services/audio.service';
import { IonRange } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Utils } from '../utils/utils';
import { Plugins, NetworkStatus } from '@capacitor/core';
const { Network } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  @ViewChild('range') range: IonRange;

  playing = false;
  title = '';
  progress = 0;
  curTime = '00:00';
  duration = '00:00';
  movingSlider = false;
  sliderSubscription: Subscription;
  online: boolean = true;

  constructor(private audioService: AudioService, private utils: Utils) {
    this.audioService.onChange().subscribe((res: any) => {
      this.playing = res.playing;
      if (this.playing) {
        this.updateProgress();
      }
      if (res.title) {
        this.title = res.title;
      }
    });
    Network.addListener("networkStatusChange", (status: NetworkStatus) => {
      this.online = status.connected;
    });
  }

  seek() {
    this.sliderSubscription.unsubscribe();
    this.movingSlider = false;
    const newValue: number = +this.range.value;
    const endTime: number = this.audioService.getDuration();
    if(endTime * (newValue / 1000) === endTime) {
      this.close();
      return;
    }
    this.audioService.setSeek(
      this.audioService.getDuration() * (newValue / 1000),
    );
    this.updateProgress();
  }

  play() {
    this.audioService.play();
  }

  close() {
    this.audioService.stop();
    this.playing = false;
    this.title = '';
    this.progress = 0;
    this.duration = '00:00';
    this.curTime = '00:00';
  }

  updateProgress() {
    if (this.playing && !this.movingSlider) {
      if (!isNaN(this.audioService.getSeek())) {
        const newValue: number = +this.range.value;
        const endTime:number = this.audioService.getDuration();
        if((endTime * (newValue / 1000) + 0.1) > endTime && this.curTime !== '00:00') {
          this.close();
          return;
        }
        this.progress =
        (this.audioService.getSeek() / this.audioService.getDuration()) *
        1000 || 0;
        this.curTime = this.utils.getMinString(
          Math.round(this.audioService.getSeek()),
          );
        this.duration = this.utils.getMinString(
          Math.round(this.audioService.getDuration()),
        );
      }
      setTimeout(() => {
        this.updateProgress();
      }, 50);
    }
  }

  onRangeFocus() {
    this.movingSlider = true;
    const endTime = this.audioService.getDuration();
    this.sliderSubscription = this.range.ionChange.subscribe(() => {
      this.curTime = this.utils.getMinString(
        Math.round((+this.range.value / 1000) * endTime),
      );
    });
  }
}
