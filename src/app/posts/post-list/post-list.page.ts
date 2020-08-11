import { Component, OnInit, ViewChild } from '@angular/core';
import { WpService } from 'src/app/services/wp.service';
import { Rubrik } from 'src/app/utils/constants';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {

  @ViewChild('select', { static: false }) select: IonSelect;

  posts = [];
  allPosts = [];
  filteredPosts = [];
  rubriken = [];
  page = 1;
  count = null;
  items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  searchTerm = '';
  currentRubrik = 'all';

  constructor(
    private wp: WpService
  ) { }

  ngOnInit() {
    this.loadPosts();
    this.getAllPosts();
  }

  onSearch(event: any) {
    this.searchTerm = '';
    this.posts = this.filteredPosts;

    this.searchTerm = event.srcElement.value;

    if (!this.searchTerm) {
      return;
    }

    this.posts = this.filter();
  }

  filter() {
    if (this.searchTerm === '') {
      return this.filteredPosts;
    } else {
      return this.filteredPosts.filter((post: any) => {
        if (post.rubrikName && post.title.rendered && this.searchTerm) {
          if (post.title.rendered.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
            post.rubrikName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });
    }
  }

  async onFilter() {
    this.select.open();
  }

  filterRubrik() {
    if (this.currentRubrik === 'all') {
      this.searchTerm = '';
      this.posts = this.allPosts;
      this.filteredPosts = this.allPosts;
    } else {
      this.searchTerm = '';
      this.posts = this.allPosts.filter((post: any) => post.rubrik === this.currentRubrik);
      this.filteredPosts = this.posts;
    }
  }

  getAllPosts() {
    this.wp.getAllPosts().subscribe(res => {
      this.allPosts = res.map((post: any) => {
        return {
          ...post,
          rubrikName: post.rubrik ? Rubrik[post.rubrik] : ''
        };
      });
      this.posts = this.allPosts;
      this.filteredPosts = this.allPosts;
      const rubriken: Set<string> = new Set(this.allPosts.filter(((post: any) => post.rubrik)).map((post: any) => post.rubrik));
      this.rubriken = Array.from(rubriken.values()).map((r: string) => {
        return {
          id: r,
          name: Rubrik[r]
        };
      }).sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    });
  }

  loadPosts(event?: any) {
    this.wp.getPosts().subscribe(res => {
      if (!this.allPosts) {
        this.count = this.wp.totalPosts;
        this.posts = res.map((post: any) => {
          return {
            ...post,
            rubrikName: post.rubrik ? Rubrik[post.rubrik] : ''
          };
        });
      }
      if (event) {
        event.target.complete();
        this.currentRubrik = 'all';
        this.allPosts = [];
        this.filteredPosts = [];
        this.getAllPosts();
      }
    });
  }

  loadMore(event: any) {
    this.page++;

    this.wp.getPosts(this.page).subscribe(res => {
      this.posts = [...this.posts, ...res.map((post: any) => {
        return {
          ...post,
          rubrikName: post.rubrik ? Rubrik[post.rubrik] : ''
        };
      })];
      event.target.complete();

      // Disable infinite loading when maximum reached
      if (this.page.toString() === this.wp.pages) {
        event.target.disabled = true;
      }
    });
  }

}
