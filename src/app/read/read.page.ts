import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase/firebase.service';
import { Ausgabe, Tag } from '../utils/interfaces';

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {
  ausgaben: Ausgabe[];
  tags: Tag[];
  slideOpts = {
    height: 50,
    slidesPerColumnFill: 'row',
    slidesPerView: 2.4,
    slidesPerColumn: 2,
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
  slideOptsTags = {
    ...this.slideOpts,
    slidesPerColumn: 3,
    spaceBetween: 35,
    breakpoints: {},
  }

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
  ) { }

  async ngOnInit() {
    await this.firebaseService.loadCategories();
    await this.firebaseService.loadTags();
    this.tags = this.firebaseService.getTags();
    this.ausgaben = await this.firebaseService.getAusgaben();
  }

  openAusgabe(ausgabe: Ausgabe) {
    this.router.navigateByUrl(`/tabs/lesen/ausgabe/${ausgabe.id}`);
  }

}
