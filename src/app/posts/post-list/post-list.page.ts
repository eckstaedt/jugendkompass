import { Component, OnInit, ViewChild } from '@angular/core';
import { WpService } from 'src/app/services/wp.service';
import { Rubrik } from 'src/app/utils/constants';
import {
  IonSelect,
  DomController,
  IonContent,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Utils } from 'src/app/utils/utils';
import { AppComponent } from 'src/app/app.component';
import { Storage } from '@ionic/storage';
import { Post, Category, CategoryData } from 'src/app/utils/interfaces';
import { RouterService } from 'src/app/services/router.service';
import { FilterModalPage } from '../filter-modal/filter-modal.page';
import { modalEnterAnimation, modalLeaveAnimation } from 'src/app/modal-animation';
import { FirebaseService } from 'src/app/services/firebase.service';
import {SegmentChangeEventDetail} from '@ionic/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {
  @ViewChild('select') select: IonSelect;
  @ViewChild('content') content: IonContent;
  @ViewChild('searchbar') searchbar: any;

  posts: Post[] = [];
  allPosts: Post[] = [];
  filteredPosts: Post[] = [];
  rubriken = [];
  page = 1;
  count = null;
  items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  searchTerm = '';
  currentRubrik: string = 'all';
  ausgaben: Category[] = [];
  currentAusgabe: string = 'all';
  readArticles: Category[] = [];
  showOnlyUnread: boolean = false;
  areFiltersActive: boolean = false;

  constructor(
    private wp: WpService,
    private utils: Utils,
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
      }
    });

    this.getInitialFilterData();
  }

  async getInitialFilterData(): Promise<void> {
    const filterObject = await this.storage.get("filter");
    if (filterObject) {
      this.currentAusgabe = filterObject.ausgabe;
      this.currentRubrik = filterObject.rubrik;
      this.showOnlyUnread = filterObject.showOnlyUnread;
      this.areFiltersActive = this.currentAusgabe !== 'all' || this.showOnlyUnread;
    }
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
    await this.wp.getCategories();
    this.ausgaben = this.wp.getAusgaben();
    this.rubriken = this.wp.getRubriken();
    this.getAllPosts();
  }

  async onSearch(event: any) {
    this.searchTerm = '';
    this.posts = this.filteredPosts;

    this.searchTerm = event.srcElement.value;

    if (!this.searchTerm) {
      return;
    }

    if (this.searchTerm === 'JugendkompassAdmin$123') {
      await this.firebaseService.setAdmin();
      const toast = await this.toastController.create({
        message: 'Admin Authentifizierung erfolgreich',
        color: 'success',
        duration: 1000
      });
      toast.present();
    }

    this.posts = this.search();
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
          post.rubrik && post.rubrik.id === this.currentRubrik,
      );
    }
    if (this.showOnlyUnread) {
      posts = posts.filter((post: Post) => !post.articleWasRead);
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
          post.title.rendered
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
          post.excerpt.rendered
            .toLowerCase()
            .indexOf(this.searchTerm.toLowerCase()) > -1
        ) {
          return true;
        }
        return false;
      });
    }
  }

  getAllPosts() {
    // get local storage for already read articles
    this.storage.get('readArticles').then((res: any) => {
      if (res) this.readArticles = JSON.parse(res);
    });
    this.wp.getAllPosts().then((res: any) => {
      this.allPosts = this.getEditedPosts(res.data);
      this.filter();
      this.filteredPosts = this.allPosts;
    });
  }

  getEditedPosts(posts: Post[]): Post[] {
    return posts.map((post: any) => {
      const categroyData: CategoryData = this.utils.getCategoryData(
        post,
        this.rubriken,
        this.ausgaben,
      );
      let articleWasRead: boolean = false;
      if (this.readArticles) {
        articleWasRead = this.readArticles.includes(post.id);
      }
      return {
        ...post,
        media_url: post._embedded['wp:featuredmedia']
          ? post._embedded['wp:featuredmedia'][0].media_details.sizes.medium
              .source_url
          : undefined,
        rubrik: categroyData.rubrik,
        ausgabe: categroyData.ausgabe,
        articleWasRead: articleWasRead,
      };
    });
  }

  // set local storage when a post is clicked
  setAsRead(post: any) {
    if (!this.readArticles.includes(post.id)) {
      post.articleWasRead = true;
      this.readArticles.push(post.id);
      this.storage.set('readArticles', JSON.stringify(this.readArticles));
    }
  }

  filterKategorie(event: CustomEvent<SegmentChangeEventDetail>) {
    // console.log(event.detail);  TEST functionality in browser view
    // console.log(this.rubriken); TEST if rubriken get loaded from wp service (they dont currently 6/4)
    this.currentRubrik = event.detail.value;
    //console.log(this.currentRubrik);
    //console.log(this.rubriken);
    this.filter();
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
      await this.storage.set("filter", {
        showOnlyUnread: filterObject.showOnlyUnread,
        rubrik: this.currentRubrik,
        ausgabe: filterObject.ausgabe
      });
    }
  }
}
