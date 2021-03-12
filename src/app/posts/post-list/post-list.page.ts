import { Component, OnInit, ViewChild } from '@angular/core';
import { WpService } from 'src/app/services/wp.service';
import { Rubrik } from 'src/app/utils/constants';
import { IonSelect, DomController, IonContent, IonSearchbar } from '@ionic/angular';
import { Utils } from 'src/app/utils/utils';
import { AppComponent } from 'src/app/app.component';
import { Storage } from '@ionic/storage';
import { Post } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {

  @ViewChild('select', { static: false }) select: IonSelect;
  @ViewChild('content', { static: false }) content: IonContent;
  @ViewChild('searchbar', { static: false }) searchbar: any;

  posts: Post[] = [];
  allPosts: Post[] = [];
  filteredPosts: Post[] = [];
  rubriken = [];
  page = 1;
  count = null;
  items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  searchTerm = '';
  currentRubrik = 'all';
  ausgaben: any[] = []; // TODO give interface
  currentAusgabe: any = 'all';
  readArticles: any[] = [];

  constructor(
    private wp: WpService,
    private utils: Utils,
    private appComponent: AppComponent,
    private storage: Storage,
    private domCtrl: DomController,
  ) { }

  ngOnInit() {
    this.appComponent.getObservable().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.loadData();
      }
    });
    this.domCtrl.read(() => {
      this.content.scrollToPoint(0, 60);
    });
  }

  async loadData() {
    await this.getCategories();
    this.loadPosts();
    this.getAllPosts();
  }

  async getCategories() {
    return new Promise((resolve: any, reject: any) => {
      this.ausgaben = [];
      this.wp.getCategories().then((categories: any) => {
        if (categories.data) {
          const ausgabenCategory = categories.data.find((cat: any) => cat.name === 'Ausgaben');
          const rubrikenCategory = categories.data.find((cat: any) => cat.name === 'Rubriken');
          this.ausgaben = categories.data
            .filter((cat: any) => cat.parent === ausgabenCategory.id && cat.count !== 0)
            .sort((a: any, b: any) => b.id - a.id);
          this.rubriken = categories.data
            .filter((cat: any) => cat.parent === rubrikenCategory.id && cat.count !== 0)
            .sort((a: any, b: any) => a.name - b.name);
        }
        resolve();
      }).catch(() => {
        this.utils.showToast('Fehler beim Laden der Kategorien');
        reject();
      });
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

  filterAusgabe() {
    this.searchTerm = '';
    let posts: any[] = [];
    if (this.currentAusgabe === 'all') {
      posts = this.allPosts;
    } else {
      posts = this.allPosts.filter((post: any) => post.ausgabe && post.ausgabe.id === this.currentAusgabe);
    }
    if (this.currentRubrik !== 'all') {
      posts = posts.filter((post: any) => post.ausgabe && post.ausgabe.id === this.currentAusgabe);
    }
    this.posts = posts;
    this.filteredPosts = this.posts;
  }

  filterRubrik() {
    this.searchTerm = '';
    let posts: any[] = [];
    if (this.currentRubrik === 'all') {
      posts = this.allPosts;
    } else {
      posts = this.allPosts.filter((post: any) => post.rubrik && post.rubrik.id === this.currentRubrik);
    }
    if (this.currentAusgabe !== 'all') {
      posts = posts.filter((post: any) => post.ausgabe && post.ausgabe.id === this.currentAusgabe);
    }
    this.posts = posts;
    this.filteredPosts = this.posts;
  }

  filter() {
    if (this.searchTerm === '') {
      return this.filteredPosts;
    } else {
      return this.filteredPosts.filter((post: any) => {
        if (post.title.rendered.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
        post.rubrik && post.rubrik.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
        post.ausgabe && post.ausgabe.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
        post.excerpt.rendered.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      });
    }
  }

  async onFilter() {
    this.select.open();
  }

  getAllPosts() {
    // get local storage for already read articles
    this.storage.get('readArticles').then((res: any) => {
      if(res) this.readArticles = JSON.parse(res);
    });
    this.wp.getAllPosts().then((res: any) => {
      this.allPosts = res.data.map((post: any) => {
        let rubrik: any;
        let ausgabe: any;
        let articleWasRead: boolean;
        if (this.readArticles) articleWasRead = this.readArticles.includes(post.id);
        for (const cat of post.categories) {
          if (Boolean(this.rubriken.find((rub: any) => rub.id === cat))) {
            rubrik = this.rubriken.find((rub: any) => rub.id === cat);
          }
          if (Boolean(this.ausgaben.find((aus: any) => aus.id === cat))) {
            ausgabe = this.ausgaben.find((aus: any) => aus.id === cat);
          }
        }
        return {
          ...post,
          media_url: post._embedded['wp:featuredmedia'] ?
            post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : undefined,
          // tslint:disable-next-line: object-literal-shorthand
          rubrik: rubrik,
          // tslint:disable-next-line: object-literal-shorthand
          ausgabe: ausgabe,
          articleWasRead: articleWasRead
        };
      });
      this.posts = this.allPosts;
      this.filteredPosts = this.allPosts;
    });
  }

  loadPosts(event?: any) {
    // this.pages = resp.headers.get('x-wp-totalpages');
    // this.totalPosts = parseInt(resp.headers.get('x-wp-total'), 10);
    this.wp.getPosts().then((res: any) => {
      if (!this.allPosts) {
        this.count = parseInt(res.headers.get('x-wp-total'), 10);
        this.posts = res.data.map((post: any) => {
          let rubrik: any;
          let ausgabe: any;
          for (const cat of post.categories) {
            if (Boolean(this.rubriken.find((rub: any) => rub.id === cat))) {
              rubrik = this.rubriken.find((rub: any) => rub.id === cat);
            }
            if (Boolean(this.ausgaben.find((aus: any) => aus.id === cat))) {
              ausgabe = this.ausgaben.find((aus: any) => aus.id === cat);
            }
          }
          return {
            ...post,
            media_url: post._embedded['wp:featuredmedia'] ?
              post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : undefined,
            // tslint:disable-next-line: object-literal-shorthand
            rubrik: rubrik,
            // tslint:disable-next-line: object-literal-shorthand
            ausgabe: ausgabe,
          };
        });
      }
      if (event) {
        event.target.complete();
        this.currentRubrik = 'all';
        this.currentAusgabe = 'all';
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
          media_url: post._embedded['wp:featuredmedia'] ?
            post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : undefined
        };
      })];
      event.target.complete();

      // Disable infinite loading when maximum reached
      if (this.page.toString() === this.wp.pages) {
        event.target.disabled = true;
      }
    });
  }
  // set local storage when a post is clicked
  setAsRead(post: any) {
    if(!this.readArticles.includes(post.id)) {
      post.articleWasRead = true;
      this.readArticles.push(post.id);
      this.storage.set('readArticles', JSON.stringify(this.readArticles));
    }
  }
}
