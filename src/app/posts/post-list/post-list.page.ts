import { Component, OnInit } from '@angular/core';
import { WpService } from 'src/app/services/wp.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {

  posts = [];
  page = 1;
  count = null;

  constructor(
    private wp: WpService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadPosts();
  }

  async loadPosts() {
    const loading = await this.loadingController.create({
      message: 'Loading Data...'
    });
    await loading.present();

    this.wp.getPosts().subscribe(res => {
      this.count = this.wp.totalPosts;
      this.posts = res;
      loading.dismiss();
    });
  }

  loadMore(event) {
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
