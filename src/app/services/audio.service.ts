import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private sound: any;
  private loadedSound: any;
  private loadedTitle: string;
  private observer: any;
  private titleObserver: any;
  private title: string;
  private playing = false;

  constructor() {}

  onChange(): Observable<any> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }

  onTitleChange(): Observable<any> {
    return new Observable(observer => {
      this.titleObserver = observer;
    });
  }

  loadNewAudio(audioUrl: string, title: string) {
    this.loadedSound = new Howl({
      html5: true,
      src: [audioUrl],
    });

    this.loadedTitle = title;
  }

  getTitle(): string {
    return this.title;
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
    this.title = '';
    this.titleObserver.next({
      title: ''
    });
  }

  playNew() {
    if (this.sound) {
      this.sound.pause();
    }
    this.title = this.loadedTitle;
    this.sound = this.loadedSound;
    this.sound.play();
    this.playing = true;
    this.observer.next({
      title: this.title,
      playing: true,
    });
    this.titleObserver.next({
      title: this.title
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
