import { Component, ViewChild } from '@angular/core';
import { AudioService } from '../services/audio.service';
import { IonRange } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild('range', { static: false }) range: IonRange;

  playing = false;
  title = '';
  progress = 0;
  focus = false;
  curTime = '00:00';
  duration = '00:00';

  constructor(
    private audioService: AudioService
  ) {
    this.audioService.onChange().subscribe((res: any) => {
      this.playing = res.playing;
      if (this.playing) {
        this.updateProgress();
      }
      this.title = res.title;
    });
  }

  seek() {
    const newValue: number = +this.range.value;
    this.audioService.setSeek(this.audioService.getDuration() * (newValue / 100));
    this.focus = false;
    this.updateProgress();
  }

  play() {
    this.audioService.play();
  }

  close() {
    this.audioService.stop();
    this.playing = false;
    this.title = '';
  }

  updateProgress() {
    if (!this.focus) {
      if (!isNaN(this.audioService.getSeek())) {
        this.progress = (this.audioService.getSeek() / this.audioService.getDuration()) * 100 || 0;
        this.curTime = this.getMinString(Math.round(this.audioService.getSeek()));
        this.duration = this.getMinString(Math.round(this.audioService.getDuration()));
      }
      setTimeout(() => {
        this.updateProgress();
      }, 500);
    }
  }

  getMinString(time: number): string {
    const hours: number | string = Math.floor(time / 3600);
    let minutes: number | string = Math.floor((time - (hours * 3600)) / 60);
    let seconds: number | string = time - (hours * 3600) - (minutes * 60);

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }

  onRangeFocus() {
    this.focus = true;
  }

}
