import { Injectable } from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { Observable, Subscriber } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category, FirebasePost, CategoryData } from '../utils/interfaces';
import { Utils } from '../utils/utils';
import { HttpClient } from '@angular/common/http';
import { firestore } from 'firebase/app';
import * as firebase from 'firebase/app';
import { AnalyticsField } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  subscriber: Subscriber<boolean>;
  rubrics: Category[];
  ausgaben: Category[];
  readArticles: FirebasePost[] = [];
  posts: FirebasePost[];
  categories: Category[];
  legalPages: any[];

  constructor(
    private db: AngularFirestore,
    private storage: Storage,
    private utils: Utils,
    private httpClient: HttpClient
  ) {
    this.init();
  }

  async init() {
    await this.loadCategories();
    const readArticles = await this.storage.get('readArticles');
    if (readArticles) {
      this.readArticles = JSON.parse(readArticles);
    }
  }

  incrementAnalyticsField(field: AnalyticsField) {
    const now: Date = new Date();
    const increment = firestore.FieldValue.increment(1);
    const analyticsData: any = firestore.FieldValue.arrayUnion({
      timestamp: firebase.firestore.Timestamp.fromDate(now),
      platform: this.utils.getPlatform()
    });

    this.db.doc('analytics/overall').set({
      [`${field}Count`]: increment,
      [`${field}Data`]: analyticsData
    }, { merge: true });
  }

  getAnalyticsOverview() {
    return this.db.doc('analytics/overall').valueChanges();
  }

  async loadCategories() {
    if (this.ausgaben && this.rubrics) {
      return Promise.resolve();
    } else {
      const categories: any = await this.db.collection<Category[]>('categories')
        .valueChanges().pipe(take(1)).toPromise();
      const ausgabenCategory = categories.find(
        (cat: any) => cat.name === 'Ausgaben',
      );
      const rubrikenCategory = categories.find(
        (cat: any) => cat.name === 'Rubriken',
      );
      this.ausgaben = categories
        .filter(
          (cat: Category) =>
            cat.parent.toString() === ausgabenCategory.id && cat.count !== 0,
        )
        .sort((a: Category, b: Category) => {
          if ( a.name < b.name ) {
            return -1;
          }
          if ( a.name > b.name ) {
            return 1;
          }
          return 0;
        })
        .reverse();
      this.rubrics = categories
        .filter(
          (cat: Category) =>
            cat.parent.toString() === rubrikenCategory.id && cat.count !== 0,
        )
        .sort((a: Category, b: Category) => a.id - b.id);
    }
  }

  getAusgaben() {
    return this.ausgaben;
  }

  getRubrics() {
    return this.rubrics;
  }

  async getPost(id: string) {
    if (this.posts) {
      return this.posts.find((post: FirebasePost) => post.id === id);
    } else {
      await this.getPosts().pipe(take(1)).toPromise();
      return this.posts.find((post: FirebasePost) => post.id === id);
    }
  }

  getPosts() {
    return new Observable((observer) => {
      this.db.collection('posts').valueChanges().subscribe((posts: FirebasePost[]) => {
        this.posts = this.getEditedPosts(posts).sort((p1: FirebasePost, p2: FirebasePost) => {
          if ( p1.ausgabe && p2.ausgabe && p1.ausgabe.name < p2.ausgabe.name ) {
            return -1;
          }
          if ( p1.ausgabe && p2.ausgabe && p1.ausgabe.name > p2.ausgabe.name ) {
            return 1;
          }
          return 0;
        }).reverse();
        observer.next(this.posts);
      });
    });
  }

  incrementPostViews(id: string) {
    const increment = firestore.FieldValue.increment(1);
    this.db.doc(`posts/${id}`).update({
      views: increment
    });
  }

  incrementAudioPlays(id: string) {
    const increment = firestore.FieldValue.increment(1);
    this.db.doc(`posts/${id}`).update({
      audioPlays: increment
    });
  }

  getEditedPosts(posts: FirebasePost[]): FirebasePost[] {
    return posts.map((post: any) => {
      const categroyData: CategoryData = this.utils.getCategoryData(
        post,
        this.rubrics,
        this.ausgaben,
      );
      let articleWasRead: boolean = false;
      if (this.readArticles) {
        articleWasRead = this.readArticles.includes(post.id);
      }
      return {
        ...post,
        rubrik: categroyData.rubrik,
        ausgabe: categroyData.ausgabe,
        articleWasRead: articleWasRead,
      };
    });
  }

  async loadLegalPages() {
    if (this.legalPages) {
      return;
    }
    this.legalPages = await this.db.collection<any[]>('pages')
      .valueChanges().pipe(take(1)).toPromise();
  }

  async getImprint() {
    await this.loadLegalPages();
    return this.legalPages.find((page: any) => page.id === 'imprint');
  }

  async getDataProt() {
    await this.loadLegalPages();
    return this.legalPages.find((page: any) => page.id === 'dataprot');
  }

  async setAdmin() {
    this.subscriber.next(true);
    this.incrementAnalyticsField(AnalyticsField.ADMIN_LOGGED_IN);
    return await this.storage.set('isAdmin', true);
  }

  async isAdmin(): Promise<boolean> {
    const isAdmin: boolean = Boolean(await this.storage.get('isAdmin'));
    if (this.subscriber) {
      this.subscriber.next(isAdmin);
    }
    return isAdmin;
  }

  subscribeToAdmin(): Observable<boolean> {
    return new Observable((subscriber: Subscriber<boolean>) => {
      this.subscriber = subscriber;
      this.isAdmin();
    });
  }

  async getBase64ImgFromUrl(imageURL: any) {
    return new Promise(async (resolve, reject) => {
      const data: Blob = await this.httpClient.get(`https://cors.bridged.cc/${imageURL}`, {responseType: 'blob'}).toPromise();
      if (data) {
        let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.addEventListener("load", () => {
          resolve(reader.result.toString());
        }, false);
      } else {
        reject(imageURL);
      }
    });
  }
}
