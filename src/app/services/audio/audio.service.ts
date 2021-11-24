import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Observable } from 'rxjs';
import { FirebasePost } from 'src/app/utils/interfaces';
@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private sound: any;
  private loadedSound: any;
  private loadedTitle: string;
  private titleObserver: any;
  private title: string;
  private playing = false;
  private currentPost: FirebasePost;

  constructor() {
  }

  onTitleChange(): Observable<any> {
    return new Observable(observer => {
      this.titleObserver = observer;
    });
  }

  loadNewAudio(audioUrl: string, post: FirebasePost) {
    this.loadedSound = new Howl({
      html5: true,
      src: [audioUrl],
    });

    this.currentPost = post;
    this.loadedTitle = post.title;
  }

  getCurrentPost(): FirebasePost {
    return this.currentPost;
  }

  getTitle(): string {
    return this.title;
  }

  getPlaying(): boolean {
    return this.playing;
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
    this.titleObserver.next('');
  }

  playNew() {
    if (this.sound) {
      this.sound.pause();
    }
    this.title = this.loadedTitle;
    this.sound = this.loadedSound;
    this.sound.play();
    this.playing = true;
    this.titleObserver.next(this.title);
  }

  play() {
    if (this.playing) {
      this.sound.pause();
      this.playing = false;
    } else {
      this.sound.play();
      this.playing = true;
    }
  }

  pause() {
    if (this.playing) {
      this.sound.pause();
      this.playing = false;
    }
  }

  changeRate(rate: number): void {
    this.sound.rate(rate);
  }
}
