import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRange, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AudioService } from '../services/audio/audio.service';
import { FirebasePost } from '../utils/interfaces';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-audio-modal',
  templateUrl: './audio-modal.page.html',
  styleUrls: ['./audio-modal.page.scss'],
})
export class AudioModalPage implements OnInit {
  @ViewChild('range') range: IonRange;

  playing = false;
  title = '';
  progress = 0;
  curTime = '00:00';
  duration = '00:00';
  movingSlider = false;
  sliderSubscription: Subscription;
  post: FirebasePost;
  faster: boolean = false;

  constructor(
    private audioService: AudioService,
    private utils: Utils,
    private modalController: ModalController,
  ) {
  }

  ngOnInit() {
    this.post = this.audioService.getCurrentPost();
  }

  ionViewWillEnter() {
    this.playing = this.audioService.getPlaying();
    this.updateProgress();
  }

  seek() {
    this.sliderSubscription.unsubscribe();
    this.movingSlider = false;
    const newValue: number = +this.range.value;
    const endTime: number = this.audioService.getDuration();
    if (endTime * (newValue / 1000) === endTime) {
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
    this.playing = !this.playing;
  }

  close() {
    this.audioService.stop();
    this.playing = false;
    this.title = '';
    this.progress = 0;
    this.duration = '00:00';
    this.curTime = '00:00';
    this.modalController.dismiss();
  }

  updateProgress() {
    if (this.playing && !this.movingSlider) {
      if (!isNaN(this.audioService.getSeek())) {
        const newValue: number = +this.range.value;
        const endTime: number = this.audioService.getDuration();
        if (
          endTime * (newValue / 1000) + 0.1 > endTime &&
          this.curTime !== '00:00'
        ) {
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

  changeRate() {
    this.faster = !this.faster;
    this.audioService.changeRate(this.faster ? 1.5 : 1);
  }

}
