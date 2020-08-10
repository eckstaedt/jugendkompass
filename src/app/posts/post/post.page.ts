import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpService } from 'src/app/services/wp.service';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  public post: any;
  public sound: any;
  public soundReady = false;
  public playing = false;

  constructor(
    private route: ActivatedRoute,
    private wp: WpService,
    private audioService: AudioService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.wp.getPostContent(id).subscribe(res => {
      this.post = res;
      if (this.post.content.rendered.search('Audio Download</a>') !== -1) {
        this.post.content.rendered = this.post.content.rendered.slice(this.post.content.rendered.search('Audio Download</a>') + 18);
      } else if (this.post.content.rendered.search('PDF Download</a>') !== -1) {
        this.post.content.rendered = this.post.content.rendered.slice(this.post.content.rendered.search('PDF Download</a>') + 16);
      }

      if (this.post.audio) {
        this.audioService.loadNewAudio(this.post.audio, this.post.title.rendered);
      }
    });
  }

  openOriginal() {
    // Add InAppBrowser for app if want
    window.open(this.post.link, '_blank');
  }

  download() {
    window.open(this.post.pdf, '_blank');
  }

  play() {
    this.audioService.play();
  }
}
