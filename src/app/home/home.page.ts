import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase/firebase.service';
import { FirebasePost } from '../utils/interfaces';
import { take } from 'rxjs/operators';
import { Share } from '@capacitor/share';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public greeting: string = "Guten Tag";
  verse: any;
  postSuggests: FirebasePost[];
  impulse: FirebasePost;
  slideOpts = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    freeMode: true,
    breakpoints: {
      320: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 3.4,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 4.4,
        spaceBetween: 30,
      },
      1080: {
        slidesPerView: 5.4,
        spaceBetween: 40,
      },
    },
  };

  constructor(
    private service: FirebaseService,
    private router: Router,
  ) {
    const time: number = new Date().getHours();

    if (time < 12) {
      this.greeting = "Guten Morgen";
    }
    if (time > 17) {
      this.greeting = "Guten Abend";
    }
  }

  async ngOnInit() {
    await this.service.loadTags();
    await this.service.loadCategories();
    this.postSuggests = (await this.service.getPosts().pipe(take(1)).toPromise()).splice(4, 10);
    this.impulse = await this.service.getCurrentImpulse();
    this.verse = await this.service.getVerseOfTheDay();
  }

  async shareImpulse() {
    await Share.share({
      title: 'Impuls teilen',
      text: this.impulse.title,
      url: `https://jugendkompass.com/tabs/impulse/${this.impulse.id}`,
      dialogTitle: 'Impuls teilen',
    });
  }

  openImpulse() {
    this.router.navigateByUrl(`tabs/impulse/${this.impulse.id}`);
  }

  navigateToImpulses() {
    this.router.navigateByUrl('tabs/impulse');
  }

  openPost(post: FirebasePost) {
    this.router.navigateByUrl(`tabs/lesen/${post.id}`);
  }

}
