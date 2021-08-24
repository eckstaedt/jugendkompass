import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonSelect,
  DomController,
  ModalController,
  ToastController,
  GestureController,
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
  @ViewChild('searchbar') searchbar: any;

  posts: FirebasePost[] = [];
  posts2: FirebasePost[] = [];
  posts3: FirebasePost[] = [];
  allPosts: FirebasePost[] = [];
  filteredPosts: FirebasePost[] = [];
  filteredPosts2: FirebasePost[] = [];
  filteredPosts3: FirebasePost[] = [];
  actualContent = 1;
  isSwiping = false;

  rubriken = [];
  page = 1;
  count = null;
  items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  searchTerm = '';
  currentRubrik: string = 'all';
  currentRubrik1: string = 'all';
  currentRubrik2: string = 'all';
  currentRubrik3: string = 'all';
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
    private gestureCtrl: GestureController
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
    const filterData: Category | undefined = this.routerService.getData();

    this.areFiltersActive = this.currentAusgabe !== 'all' || this.currentRubrik !== 'all';
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

  ngAfterViewInit() {
    this.setSwipeEvents();
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
      if (this.actualContent === 1) {
        this.posts = this.search();
      }
      else if (this.actualContent === 2) {
        this.posts2 = this.search();
      }
      else if (this.actualContent === 3) {
        this.posts3 = this.search();
      }
    }
  }

  onCategoryPressed() {
    if (!this.isSwiping)
      this.filter();
    this.firebaseService.incrementAnalyticsField(
      AnalyticsField.CATEGORY_CHANGED,
    );
  }

  filter() {
    this.searchTerm = '';
    let posts: any[] = this.allPosts;
    let currentRubrik = 'all';

    if (this.currentAusgabe !== 'all') {
      posts = posts.filter(
        (post: any) => post.ausgabe && post.ausgabe.id === this.currentAusgabe,
      );
    }
    if (this.showOnlyUnread) {
      posts = posts.filter((post: FirebasePost) => !post.articleWasRead);
    }

    if (this.actualContent === 1) {
      if (this.currentRubrik !== 'all') {
        this.posts = posts.filter((post: any) => { return this.filterRubrik(post, this.currentRubrik); });
      }
      else {
        this.posts = posts;
      }
      this.currentRubrik1 = this.currentRubrik;
      this.filteredPosts = this.posts;

      if (this.currentRubrik !== 'all') {
        
        if (this.rubriken.findIndex((b) => b.id === this.currentRubrik) > 0)
        currentRubrik = this.rubriken[this.rubriken.findIndex((b) => b.id === this.currentRubrik) - 1].id;
        else
        currentRubrik = 'all';
        this.posts2 = posts.filter((post: any) => { return this.filterRubrik(post, currentRubrik); });

        if (this.rubriken.findIndex((b) => b.id === this.currentRubrik) < this.rubriken.length - 1) {
          this.currentRubrik3 = this.rubriken[this.rubriken.findIndex((b) => b.id === this.currentRubrik) + 1].id;
          this.posts3 = posts.filter((post: any) => { return this.filterRubrik(post, this.currentRubrik3); });
        }
      }
      else {
        this.currentRubrik3 = this.rubriken[0].id;
        this.posts3 = posts.filter((post: any) => { return this.filterRubrik(post, this.currentRubrik3); });
      }
    }
    else if (this.actualContent === 2) {
      if (this.currentRubrik !== 'all') {
        this.posts2 = posts.filter((post: any) => { return this.filterRubrik(post, this.currentRubrik); });
      }
      else {
        this.posts2 = posts;
      }
      this.currentRubrik2 = this.currentRubrik;
      this.filteredPosts2 = this.posts;

      if (this.currentRubrik !== 'all') {
        if (this.rubriken.findIndex((b) => b.id === this.currentRubrik) > 0)
          this.currentRubrik1 = this.rubriken[this.rubriken.findIndex((b) => b.id === this.currentRubrik) - 1].id;
        else
          this.currentRubrik1 = 'all';
        this.posts = posts.filter((post: any) => { return this.filterRubrik(post, this.currentRubrik1); });

        if (this.rubriken.findIndex((b) => b.id === this.currentRubrik) < this.rubriken.length - 1) {
          this.currentRubrik3 = this.rubriken[this.rubriken.findIndex((b) => b.id === this.currentRubrik) + 1].id;
          this.posts3 = posts.filter((post: any) => { return this.filterRubrik(post, this.currentRubrik3); });
        }
      }
      else {
        this.currentRubrik3 = this.rubriken[0].id;
        this.posts3 = posts.filter((post: any) => { return this.filterRubrik(post, this.currentRubrik3); });
      }
    }
    else if (this.actualContent === 3) {
      if (this.currentRubrik !== 'all') {
        this.posts3 = posts.filter((post: any) => { return this.filterRubrik(post, this.currentRubrik); });
      }
      else {
        this.posts3 = posts;
      }
      this.currentRubrik3 = this.currentRubrik;
      this.filteredPosts3 = this.posts;

      if (this.currentRubrik !== 'all') {
        if (this.rubriken.findIndex((b) => b.id === this.currentRubrik) > 0)
          this.currentRubrik2 = this.rubriken[this.rubriken.findIndex((b) => b.id === this.currentRubrik) - 1].id;
        else
          this.currentRubrik2 = 'all';
        this.posts2 = posts.filter((post: any) => { return this.filterRubrik(post, this.currentRubrik2); });

        if (this.rubriken.findIndex((b) => b.id === this.currentRubrik) < this.rubriken.length - 1) {
          this.currentRubrik1 = this.rubriken[this.rubriken.findIndex((b) => b.id === this.currentRubrik) + 1].id;
          this.posts = posts.filter((post: any) => { return this.filterRubrik(post, this.currentRubrik1); });
        }
      }
      else {
        this.currentRubrik1 = this.rubriken[0].id;
        this.posts = posts.filter((post: any) => { return this.filterRubrik(post, this.currentRubrik1); });
      }
    }
  }

  filterRubrik(post: any, rubrik) {
    if (post.categories &&
      Boolean(
        post.categories.find(
          (cat: number) => cat.toString() === rubrik,
        ),
      )) {
      return true;
    }
    else {
      return false;
    }
  }

  search() {
    if (this.searchTerm === '') {
      if (this.actualContent === 1) {
        return this.filteredPosts;
      }
      else if (this.actualContent === 2) {
        return this.filteredPosts2;
      }
      else if (this.actualContent === 3) {
        return this.filteredPosts3;
      }
    } else {
      if (this.actualContent === 1) {
        return this.filteredPosts.filter((post: any) => this.filterFunction(post));
      }
      else if (this.actualContent === 2) {
        return this.filteredPosts2.filter((post: any) => this.filterFunction(post));
      }
      else if (this.actualContent === 3) {
        return this.filteredPosts3.filter((post: any) => this.filterFunction(post));
      }
    }
  }

  filterFunction(post: any) {
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

  onSwipeLeft() {
    if (this.rubriken.findIndex((b) => b.id === this.currentRubrik) > 0) {
      let segmentIndex = this.rubriken.findIndex((b) => b.id === this.currentRubrik);
      this.currentRubrik = this.rubriken[segmentIndex - 1].id;
      this.scrollSegment(segmentIndex);
      this.actualContent = this.setActualList(this.actualContent, false);
    } else if (this.rubriken.findIndex((b) => b.id === this.currentRubrik) === 0) {
      this.currentRubrik = 'all';
      this.scrollSegment(0);
      this.actualContent = this.setActualList(this.actualContent, false);
    }
  }

  onSwipeRight() {
    if (this.rubriken.findIndex((b) => b.id === this.currentRubrik) < this.rubriken.length - 1) {
      let segmentIndex = this.rubriken.findIndex((b) => b.id === this.currentRubrik) + 1;
      this.currentRubrik = this.rubriken[segmentIndex].id;
      this.scrollSegment(segmentIndex);
      this.actualContent = this.setActualList(this.actualContent, true);
    } else if (this.currentRubrik === 'all') {
      this.currentRubrik = this.rubriken[0];
      this.scrollSegment(0);
      this.actualContent = this.setActualList(this.actualContent, true);
    }
  }

  async scrollSegment(segmentIndex) {
    var segment = document.querySelector('ion-segment');
    segment.value = this.currentRubrik;
    var active = segment.querySelectorAll('ion-segment-button')[segmentIndex];
    active.scrollIntoView({ inline: "center" });
    this.scrollContentsTop();
  }

  scrollContentsTop() {
    var content, content1, content2, content3;
    content = document.getElementById("ionContent");
    content1 = document.getElementById("ionContent1");
    content2 = document.getElementById("ionContent2");
    content3 = document.getElementById("ionContent3");
    content.scrollToPoint(0, 60, 0);
    content1.scrollToPoint(0, 0);
    content2.scrollToPoint(0, 0);
    content3.scrollToPoint(0, 0);
  }

  setActualList(actualList, swipeRight): any {
    if (actualList === 1) {
      if (!swipeRight) {
        return 2;
      } else {
        return 3;
      }
    }
    else if (actualList === 2) {
      if (!swipeRight) {
        return 1;
      } else {
        return 3;
      }
    }
    else if (actualList === 3) {
      if (!swipeRight) {
        return 2;
      } else {
        return 1;
      }
    }
  }

  setSwipeEvents() {
    const swipeGesture = this.gestureCtrl.create({
      el: document.getElementById("ionContent"),
      threshold: 15,
      direction: 'x',
      gestureName: 'swipe',
      onStart: ev => this.onSwipeStart(ev),
      onMove: ev => this.onSwipeMove(ev),
      onEnd: ev => this.onSwipeEnd(ev)
    }, true);

    swipeGesture.enable(true);
  }

  onSwipeStart(ev) {
    var swipeX = ev.deltaX;
    if (((swipeX < 0 && this.rubriken.findIndex((b) => b.id === this.currentRubrik) < this.rubriken.length - 1) ||
      (swipeX > 0 && this.rubriken.findIndex((b) => b.id === this.currentRubrik) > -1)) && !this.isSearching) {
      var listActual, listRight, listLeft;

      if (this.actualContent === 1) {
        listActual = document.getElementById("ionContent1");
        listRight = document.getElementById("ionContent3");
        listLeft = document.getElementById("ionContent2");
      } else if (this.actualContent === 2) {
        listActual = document.getElementById("ionContent2");
        listRight = document.getElementById("ionContent3");
        listLeft = document.getElementById("ionContent1");
      } else {
        listActual = document.getElementById("ionContent3");
        listRight = document.getElementById("ionContent1");
        listLeft = document.getElementById("ionContent2");
      }

      this.domCtrl.write(() => {
        listActual.style.transition = '';
        listActual.style.display = "unset";
        listActual.style.zIndex = "2";
        listActual.style.transform = `translateX(${0}px)`;

        listRight.style.transition = '';
        listRight.style.display = "unset";
        listRight.style.zIndex = "2";
        listRight.style.transform = `translateX(${listActual.offsetWidth}px)`;
        //listRight.scrollToPoint(0, 0, 0);

        listLeft.style.transition = '';
        listLeft.style.display = "unset";
        listLeft.style.zIndex = "2";
        listLeft.style.transform = `translateX(${0 - listActual.offsetWidth}px)`;
        //listLeft.scrollToPoint(0, 0, 0);
      });
    }
  }

  onSwipeMove(ev) {
    var swipeX = ev.deltaX;
    if (((swipeX < 0 && this.rubriken.findIndex((b) => b.id === this.currentRubrik) < this.rubriken.length - 1) ||
      (swipeX > 0 && this.rubriken.findIndex((b) => b.id === this.currentRubrik) > 0)) && !this.isSearching) {
      this.setListStyleMove(ev.deltaX, this.actualContent);
    }
  }

  onSwipeEnd(ev) {
    this.isSwiping = true;
    var swipe = '';
    var swipeX = ev.deltaX;
    var setFilter = false;
    if (((swipeX < 0 && this.rubriken.findIndex((b) => b.id === this.currentRubrik) < this.rubriken.length - 1) ||
      (swipeX > 0 && this.rubriken.findIndex((b) => b.id === this.currentRubrik) > -1)) && !this.isSearching) {
      if (swipeX < -100) {
        this.onSwipeRight();
        swipe = 'right';
        setFilter = true;
      } else if (swipeX > 100) {
        this.onSwipeLeft();
        swipe = 'left';
        setFilter = true;
      }
    }

    this.setListStyleEnd(this.actualContent, swipe, setFilter);
  }

  setListStyleMove(currentX, actualList) {
    var listActual, listRight, listLeft;

    if (actualList === 1) {
      listActual = document.getElementById("ionContent1");
      listRight = document.getElementById("ionContent3");
      listLeft = document.getElementById("ionContent2");
    } else if (actualList === 2) {
      listActual = document.getElementById("ionContent2");
      listRight = document.getElementById("ionContent3");
      listLeft = document.getElementById("ionContent1");
    } else {
      listActual = document.getElementById("ionContent3");
      listRight = document.getElementById("ionContent1");
      listLeft = document.getElementById("ionContent2");
    }

    this.domCtrl.write(() => {
      listActual.style.transform = `translateX(${currentX}px)`;

      listRight.style.transform = `translateX(${currentX + listActual.offsetWidth}px)`;

      listLeft.style.transform = `translateX(${currentX - listActual.offsetWidth}px)`;
    });
  }

  setListStyleEnd(actualList, swipeDirection, setFilter) {
    var listActual, listRight, listLeft;

    if (actualList === 1) {
      listActual = document.getElementById("ionContent1");
      listRight = document.getElementById("ionContent3");
      listLeft = document.getElementById("ionContent2");
    } else if (actualList === 2) {
      listActual = document.getElementById("ionContent2");
      listRight = document.getElementById("ionContent3");
      listLeft = document.getElementById("ionContent1");
    } else {
      listActual = document.getElementById("ionContent3");
      listRight = document.getElementById("ionContent1");
      listLeft = document.getElementById("ionContent2");
    }

    this.domCtrl.write(() => {
      listActual.style.transition = '0.5s ease';
      listActual.style.display = "unset";
      listActual.style.transform = '';

      if (swipeDirection === "left") {
        listRight.style.transition = '0.55s ease';
        listRight.style.transform = `translateX(${listActual.offsetWidth}px)`;
        listRight.style.display = "unset";

        listLeft.style.transition = '0.55s ease';
        listLeft.style.transform = `translateX(${listActual.offsetWidth}px)`;
        listLeft.style.display = "unset";
      } else if (swipeDirection === "right") {
        listRight.style.transition = '0.52s ease';
        listRight.style.transform = `translateX(${0 - listActual.offsetWidth}px)`;
        listRight.style.display = "unset";

        listLeft.style.transition = '0.52s ease';
        listLeft.style.transform = `translateX(${0 - listActual.offsetWidth}px)`;
        listLeft.style.display = "unset";
      } else {
        listRight.style.transition = '0.52s ease';
        listRight.style.transform = `translateX(${listActual.offsetWidth}px)`;
        listRight.style.display = "unset";

        listLeft.style.transition = '0.52s ease';
        listLeft.style.transform = `translateX(${0 - listActual.offsetWidth}px)`;
        listLeft.style.display = "unset";
      }

      if (setFilter)
        this.filter();
      this.isSwiping = false;
    });
  }
}
