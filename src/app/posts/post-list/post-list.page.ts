import { Component, OnInit } from '@angular/core';
import { WpService } from 'src/app/services/wp.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {

  posts = [];
  page = 1;
  count = null;
  items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private wp: WpService
  ) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(event?: any) {
    this.wp.getPosts().subscribe(res => {
      this.count = this.wp.totalPosts;
      this.posts = res;
      if (event) {
        event.target.complete();
      }
    });
  }

  loadMore(event: any) {
    this.page++;

    this.wp.getPosts(this.page).subscribe(res => {
      this.posts = [...this.posts, ...res];
      event.target.complete();

      // Disable infinite loading when maximum reached
      if (this.page === this.wp.pages) {
        event.target.disabled = true;
      }
    });
  }

}
