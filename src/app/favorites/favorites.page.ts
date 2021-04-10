import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect, IonContent, DomController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppComponent } from 'src/app/app.component';
import { FirebasePost } from '../utils/interfaces';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  @ViewChild('select') select: IonSelect;
  @ViewChild('content') content: IonContent;

  posts: FirebasePost[] = [];
  allPosts: FirebasePost[] = [];
  filteredPosts: FirebasePost[] = [];
  favoritePosts: FirebasePost[] = [];
  searchTerm = '';
  rubriken = [];
  currentRubrik = 'all';
  currentCategory = 'all';
  categories = [];
  items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  count = null;

  constructor(
    private appComponent: AppComponent,
    private storage: Storage,
    private domCtrl: DomController,
  ) {}

  ngOnInit() {
    this.appComponent.getObservable().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.loadData();
      }
    });
  }

  ionViewDidEnter() {
    this.loadData();
  }

  loadData(event?: any) {
    this.storage.get('favoritePosts').then((res: any) => {
      if (res) {
        this.posts = JSON.parse(res);
        this.posts = this.sortByMostRecent(this.posts);
        this.allPosts = this.posts;
        this.filteredPosts = this.posts;
        this.favoritePosts = this.posts;
        this.domCtrl.read(() => {
          this.content.scrollToPoint(0, 60);
        });
      }
      if (event) event.target.complete();
    });
  }

  sortByMostRecent(posts: any[]) {
    return posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
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
  filterRubrik() {
    this.searchTerm = '';
    let posts: any[] = [];
    if (this.currentRubrik === 'all') {
      posts = this.allPosts;
    } else {
      posts = this.allPosts.filter(
        (post: any) => post.rubrik && post.rubrik.id === this.currentRubrik,
      );
    }
    if (this.currentCategory !== 'all') {
      posts = posts.filter(
        (post: any) =>
          post.category && post.category.id === this.currentCategory,
      );
    }
    this.posts = posts;
    this.filteredPosts = this.posts;
  }

  filterCategory() {
    this.searchTerm = '';
    let posts: any[] = [];
    if (this.currentCategory === 'all') {
      posts = this.allPosts;
    } else {
      posts = this.allPosts.filter(
        (post: any) =>
          post.category && post.category.id === this.currentCategory,
      );
    }
    if (this.currentRubrik !== 'all') {
      posts = posts.filter(
        (post: any) => post.rubrik && post.rubrik.id === this.currentRubrik,
      );
    }
    this.posts = posts;
    this.filteredPosts = this.posts;
  }

  async onFilter() {
    this.select.open();
  }

  filter() {
    if (this.searchTerm === '') {
      return this.filteredPosts;
    } else {
      return this.filteredPosts.filter((post: any) => {
        if (post.rubrik) {
          if (
            post.title.rendered
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) > -1 ||
            post.rubrik.name
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) > -1 ||
            post.excerpt.rendered
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) > -1
          ) {
            return true;
          }
          return false;
        } else {
          if (
            post.title.rendered
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) > -1 ||
            post.excerpt.rendered
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) > -1
          ) {
            return true;
          }
          return false;
        }
      });
    }
  }
}
