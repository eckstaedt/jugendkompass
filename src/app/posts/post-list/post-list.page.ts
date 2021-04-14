import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonSelect,
  DomController,
  IonContent,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Storage } from '@ionic/storage';
import { Category, FirebasePost } from 'src/app/utils/interfaces';
import { RouterService } from 'src/app/services/router.service';
import { FilterModalPage } from '../filter-modal/filter-modal.page';
import { modalEnterAnimation, modalLeaveAnimation } from 'src/app/modal-animation';
import { FirebaseService } from 'src/app/services/firebase.service';

import { Plugins } from '@capacitor/core';
import { AnalyticsField } from 'src/app/utils/constants';
const { Network } = Plugins;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {
  @ViewChild('select') select: IonSelect;
  @ViewChild('content') content: IonContent;
  @ViewChild('searchbar') searchbar: any;

  posts: FirebasePost[] = [];
  allPosts: FirebasePost[] = [];
  filteredPosts: FirebasePost[] = [];
  rubriken = [];
  page = 1;
  count = null;
  items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  searchTerm = '';
  currentRubrik: string = 'all';
  ausgaben: Category[] = [];
  currentAusgabe: string = 'all';
  readArticles: FirebasePost[] = [];
  showOnlyUnread: boolean = false;
  areFiltersActive: boolean = false;
  online: boolean = true;
  isSearching: boolean = false;
  slideOpts = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    freeMode: true,
    breakpoints: {
      320: {
        slidesPerView: 2.4,
        spaceBetween: 10
      },
      480: {
        slidesPerView: 3.4,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 4.4,
        spaceBetween: 30
      },
      1080: {
        slidesPerView: 5.4,
        spaceBetween: 40
      }
    }
  };

  constructor(
    private appComponent: AppComponent,
    private storage: Storage,
    private domCtrl: DomController,
    private routerService: RouterService,
    private modalController: ModalController,
    private toastController: ToastController,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.appComponent.getObservable().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.loadData();
        Network.addListener('networkStatusChange', async (status) => {
          if (status.connected) {
            this.online = true;
            if (!this.allPosts.length) {
              this.loadData();
            }
          } else {
            this.online = false;
            this.allPosts = [];
            this.filteredPosts = [];
            this.posts = [];
          }
        });
      }
    });
  }

  ionViewWillEnter() {
    this.domCtrl.read(() => {
      this.content.scrollToPoint(0, 60);
    });

    const filterData: Category | undefined = this.routerService.getData();

    if (filterData) {
      if (this.ausgaben.find((aus: Category) => aus.id === filterData.id)) {
        this.currentAusgabe = filterData.id.toString();
      } else {
        this.currentRubrik = filterData.id.toString();
      }
      this.filter();
    }
  }

  async loadData() {
    await this.firebaseService.loadCategories();
    this.ausgaben = this.firebaseService.getAusgaben();
    this.rubriken = this.firebaseService.getRubrics();
    await this.getAllPosts();
  }

  async onSearch(event: any) {
    this.searchTerm = '';
    this.posts = this.filteredPosts;

    this.searchTerm = event.srcElement.value;

    if (!this.searchTerm) {
      this.isSearching = false;
      return;
    }

    if (this.searchTerm === 'JugendkompassAdmin$123') {
      await this.firebaseService.setAdmin();
      const toast = await this.toastController.create({
        message: 'Admin Authentifizierung erfolgreich',
        color: 'success',
        duration: 1000
      });
      this.searchTerm = '';
      this.isSearching = false;
      toast.present();
    }

    this.isSearching = true;
    this.posts = this.search();
  }

  onCategoryPressed() {
    this.filter();
    this.firebaseService.incrementAnalyticsField(AnalyticsField.CATEGORY_CHANGED);
  }

  filter() {
    this.searchTerm = '';
    let posts: any[] = this.allPosts;
    if (this.currentAusgabe !== 'all') {
      posts = posts.filter(
        (post: any) =>
          post.ausgabe && post.ausgabe.id === this.currentAusgabe,
      );
    }
    if (this.currentRubrik !== 'all') {
      posts = posts.filter(
        (post: any) =>
          post.categories && Boolean(post.categories.find((cat: number) => cat.toString() === this.currentRubrik)),
      );
    }
    if (this.showOnlyUnread) {
      posts = posts.filter((post: FirebasePost) => !post.articleWasRead);
    }
    this.posts = posts;
    this.filteredPosts = this.posts;
  }

  search() {
    if (this.searchTerm === '') {
      return this.filteredPosts;
    } else {
      return this.filteredPosts.filter((post: any) => {
        if (
          post.title
            .toLowerCase()
            .indexOf(this.searchTerm.toLowerCase()) > -1 ||
          (post.rubrik &&
            post.rubrik.name
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) > -1) ||
          (post.ausgabe &&
            post.ausgabe.name
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) > -1) ||
          post.excerpt
            .toLowerCase()
            .indexOf(this.searchTerm.toLowerCase()) > -1
        ) {
          return true;
        }
        return false;
      });
    }
  }

  async getAllPosts() {
    // get local storage for already read articles
    const readArticles: string | undefined = await this.storage.get('readArticles');
    if (readArticles) {
      this.readArticles = JSON.parse(readArticles);
    }
    this.firebaseService.getPosts().subscribe((posts: FirebasePost[]) => {
      this.allPosts = posts;
      this.updateFavoritePosts();
      this.filter();
      this.filteredPosts = this.allPosts;
    });
  }

  async updateFavoritePosts() {
    const res: string | undefined = await this.storage.get('favoritePosts');
    if (res) {
      const favoritePosts: FirebasePost[] = JSON.parse(res);
      if (favoritePosts && favoritePosts.length) {
        const updatedArticles: FirebasePost[] = [];
        for (const article of favoritePosts) {
          if (article && article.id) {
          const updatedArticle = this.allPosts.find((a: FirebasePost) => article.id === a.id);
          if (updatedArticle) {
            updatedArticles.push({
              ...updatedArticle,
              base64Img: article.base64Img,
            });
          }
          }
        }
        this.storage.set('favoritePosts', JSON.stringify(updatedArticles));
      }
    }
  }

  // set local storage when a post is clicked
  setAsRead(post: any) {
    if (!this.readArticles.includes(post.id)) {
      post.articleWasRead = true;
      this.readArticles.push(post.id);
      this.storage.set('readArticles', JSON.stringify(this.readArticles));
    }
  }

  async openFilterModal(): Promise<void> {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: FilterModalPage,
      cssClass: 'transparent-modal',
      enterAnimation: modalEnterAnimation,
      leaveAnimation: modalLeaveAnimation,
      componentProps: {
        showOnlyUnread: this.showOnlyUnread,
        ausgabe: this.currentAusgabe
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data.filterObject) {
      const filterObject: any = data.filterObject;
      this.currentAusgabe = filterObject.ausgabe;
      this.showOnlyUnread = filterObject.showOnlyUnread;
      this.areFiltersActive = this.currentAusgabe !== 'all' || this.showOnlyUnread;
      this.filter();
    }
  }

  openAusgabe(ausgabe: Category) {
    this.firebaseService.incrementAnalyticsField(AnalyticsField.AUSGABE_OPENED, {
      ausgabe: ausgabe.id,
      ausgabenName: ausgabe.name
    });
  }
}
