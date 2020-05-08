import { Component } from '@angular/core';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  playing = false;
  title = '';

  constructor(
    private audioService: AudioService
  ) {
    this.audioService.onChange().subscribe((res: any) => {
      this.playing = res.playing;
      this.title = res.title;
    });
  }

  play() {
    this.audioService.play();
  }

}
