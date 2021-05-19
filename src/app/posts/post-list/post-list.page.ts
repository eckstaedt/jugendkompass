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
import { RouterService } from 'src/app/services/router/router.service';
import { FilterModalPage } from '../filter-modal/filter-modal.page';
import {
  modalEnterAnimation,
  modalLeaveAnimation,
} from 'src/app/modal-animation';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

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
  readArticles: string[] = [];
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
    private appComponent: AppComponent,
    private storage: Storage,
    private domCtrl: DomController,
    private routerService: RouterService,
    private modalController: ModalController,
    private toastController: ToastController,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.appComponent.getObservable().subscribe(async (loggedIn: boolean) => {
      if (loggedIn) {
        await this.getReadArticles();
        this.loadData();
        Network.addListener('networkStatusChange', async status => {
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

  async ionViewWillEnter() {
    this.domCtrl.read(() => {
      this.content.scrollToPoint(0, 60);
    });

    const filterData: Category | undefined = this.routerService.getData();

    this.areFiltersActive = false;
    if (filterData) {
      if (this.ausgaben.find((aus: Category) => aus.id === filterData.id)) {
        this.currentAusgabe = filterData.id.toString();
        this.currentRubrik = 'all';
        this.areFiltersActive = true;
      } else {
        this.currentRubrik = filterData.id.toString();
        this.currentAusgabe = 'all';
      }
    }
    if (this.showOnlyUnread) {
      this.areFiltersActive = true;
    }
    this.filter();
  }

  async getReadArticles() {
    const readArticles: string | undefined = await this.storage.get(
      'readArticles',
    );
    if (readArticles) {
      this.readArticles = JSON.parse(readArticles);
    }
  }

  async loadData() {
    await this.firebaseService.loadCategories();
    this.ausgaben = this.firebaseService.getAusgaben();
    this.rubriken = this.firebaseService.getRubrics();
    this.getAllPosts();
  }

  async onSearch(event: any) {
    this.searchTerm = '';
    this.posts = this.filteredPosts;

    this.searchTerm = event.srcElement.value;

    if (!this.searchTerm) {
      this.isSearching = false;
      return;
    }

    if (
      this.searchTerm.length > 10 &&
      (this.searchTerm.match(/:/g) || []).length === 3
    ) {
      this.isSearching = false;
      const authenticated = await this.firebaseService.login(
        this.searchTerm.split(':')[1],
        this.searchTerm.split(':')[2],
      );
      // await this.firebaseService.setAdmin();
      const toast = await this.toastController.create({
        message: authenticated
          ? 'Admin Authentifizierung erfolgreich'
          : 'Fehler beim Login...',
        color: authenticated ? 'success' : 'danger',
        duration: 1000,
      });
      this.searchTerm = '';
      toast.present();
    } else {
      this.isSearching = true;
      this.posts = this.search();
    }
  }

  onCategoryPressed() {
    this.filter();
    this.firebaseService.incrementAnalyticsField(
      AnalyticsField.CATEGORY_CHANGED,
    );
  }

  filter() {
    this.searchTerm = '';
    let posts: any[] = this.allPosts;
    if (this.currentAusgabe !== 'all') {
      posts = posts.filter(
        (post: any) => post.ausgabe && post.ausgabe.id === this.currentAusgabe,
      );
    }
    if (this.currentRubrik !== 'all') {
      posts = posts.filter(
        (post: any) =>
          post.categories &&
          Boolean(
            post.categories.find(
              (cat: number) => cat.toString() === this.currentRubrik,
            ),
          ),
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
          post.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >
          -1 ||
          (post.rubrik &&
            post.rubrik.name
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) > -1) ||
          (post.ausgabe &&
            post.ausgabe.name
              .toLowerCase()
              .indexOf(this.searchTerm.toLowerCase()) > -1) ||
          post.excerpt.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
        ) {
          return true;
        }
        return false;
      });
    }
  }

  getAllPosts() {
    this.firebaseService.getPosts().subscribe(async (posts: FirebasePost[]) => {
      await this.getReadArticles();
      this.allPosts = posts.map((post: FirebasePost) => {
        return {
          ...post,
          articleWasRead: Boolean(this.readArticles?.includes(post.id))
        }
      });
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
            const updatedArticle = this.allPosts.find(
              (a: FirebasePost) => article.id === a.id,
            );
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
    if (!this.readArticles.includes(post.id.toString())) {
      post.articleWasRead = true;
      this.readArticles.push(post.id.toString());
      this.storage.set('readArticles', JSON.stringify(this.readArticles));
    }
  }

  isRead(post: any) {
    if (this.readArticles.includes(post.id.toString())) {
      return true;
    }
    return false;
  }

  async openFilterModal(): Promise<void> {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: FilterModalPage,
      cssClass: 'transparent-modal',
      enterAnimation: modalEnterAnimation,
      leaveAnimation: modalLeaveAnimation,
      componentProps: {
        showOnlyUnread: this.showOnlyUnread,
        ausgabe: this.currentAusgabe,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    await this.getReadArticles();

    if (data.filterObject) {
      const filterObject: any = data.filterObject;
      this.currentAusgabe = filterObject.ausgabe;
      this.showOnlyUnread = filterObject.showOnlyUnread;
      this.areFiltersActive =
        this.currentAusgabe !== 'all' || this.showOnlyUnread;
      this.filter();
    }
  }

  openAusgabe(ausgabe: Category) {
    this.firebaseService.incrementAnalyticsField(
      AnalyticsField.AUSGABE_OPENED,
      {
        ausgabe: ausgabe.id,
        ausgabenName: ausgabe.name,
      },
    );
  }

  onSwipeLeft($event) {
    if (this.rubriken.findIndex((b) => b.id === this.currentRubrik) > 0) {
      let segmentIndex = this.rubriken.findIndex((b) => b.id === this.currentRubrik);
      this.currentRubrik = this.rubriken[segmentIndex - 1].id;
      this.scrollSegment(segmentIndex);
    } else if (this.rubriken.findIndex((b) => b.id === this.currentRubrik) === 0) {
      this.currentRubrik = 'all';
      this.scrollSegment(0);
    }
  }

  onSwipeRight($event) {
    if (this.rubriken.findIndex((b) => b.id === this.currentRubrik) < this.rubriken.length - 1) {
      let segmentIndex = this.rubriken.findIndex((b) => b.id === this.currentRubrik) + 1;
      this.currentRubrik = this.rubriken[segmentIndex].id;
      this.scrollSegment(segmentIndex);
    } else if (this.currentRubrik === 'all') {
      this.currentRubrik = this.rubriken[0];
      this.scrollSegment(0);
    }
  }

  async scrollSegment(segmentIndex) {
    var segment = document.querySelector('ion-segment');
    segment.value = this.currentRubrik;
    var active = segment.querySelectorAll('ion-segment-button')[segmentIndex];
    active.scrollIntoView({ inline: "center" });
    this.content.scrollToPoint(0, 60, 0);
  }
}
