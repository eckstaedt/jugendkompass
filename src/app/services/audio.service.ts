import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private sound: any;
  private loadedSound: any;
  private observer: any;
  private title: string;
  private playing = false;

  constructor() {}

  onChange(): Observable<any> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }

  loadNewAudio(audioUrl: string, title: string) {
    this.loadedSound = new Howl({
      html5: true,
      src: [audioUrl]
    });
    this.title = title;
  }

  getDuration(): number {
    return this.sound.duration();
  }

  getSeek(): number {
    return this.sound.seek();
  }

  setSeek(atPos: number) {
    this.sound.seek(atPos);
  }

  stop() {
    this.sound.stop();
  }

  playNew() {
    if (this.sound) {
      this.sound.pause();
    }
    this.sound = this.loadedSound;
    this.sound.play();
    this.playing = true;
    this.observer.next({
      title: this.title,
      playing: true,
    });
  }

  play() {
    if (this.playing) {
      this.sound.pause();
      this.playing = false;
      this.observer.next({
        playing: false,
      });
    } else {
      this.sound.play();
      this.playing = true;
      this.observer.next({
        playing: true,
      });
    }
  }
}
