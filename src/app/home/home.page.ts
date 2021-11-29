import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase/firebase.service';
import { FirebasePost } from '../utils/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  vdt: FirebasePost;
  myPosts: FirebasePost[] = [];
  slideOpts = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    freeMode: true,
    breakpoints: {
      320: {
        slidesPerView: 1.9,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 3.1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 4.1,
        spaceBetween: 30,
      },
      1080: {
        slidesPerView: 5.1,
        spaceBetween: 40,
      },
    },
  };

  constructor(
    private service: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.service.getVdt().subscribe((vdt: FirebasePost) => {
      this.vdt = vdt;
    });
    this.loadMyPosts();
  }

  async loadMyPosts() {
    this.myPosts = await this.service.getMyPosts();
  }

  openPost(postId: string): void {
    this.router.navigateByUrl(`/tabs/posts/${postId}`);
  }

}
