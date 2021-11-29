import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscriber } from 'rxjs';
import { take, finalize, first } from 'rxjs/operators';
import {
  Category,
  FirebasePost,
  CategoryData,
  Ausgabe,
} from '../../utils/interfaces';
import { Utils } from '../../utils/utils';
import { HttpClient } from '@angular/common/http';
import { FCM } from '@capacitor-community/fcm';
import { firestore } from 'firebase/app';
import * as firebase from 'firebase/app';
import { AnalyticsField, PushType } from '../../utils/constants';
import { FileLikeObject } from 'ng2-file-upload';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';

const fcm = new FCM();

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  subscriber: Subscriber<boolean>;
  rubrics: Category[];
  ausgaben: Ausgabe[];
  posts: FirebasePost[];
  impulses: FirebasePost[];
  vdt: FirebasePost;
  categories: Category[];
  legalPages: any[];

  constructor(
    private storage: Storage,
    private db: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private utils: Utils,
    private httpClient: HttpClient,
    private fns: AngularFireFunctions,
    private afAuth: AngularFireAuth,
  ) {
    this.init();
  }

  async init() {
    await this.loadCategories();
  }

  async sendTestPush(notification, data) {
    const callable: (res: any) => Observable<any> = this.fns.httpsCallable(
      'sendTestPush',
    );
    await callable({
      data: data,
      notification: notification,
    }).toPromise();
  }

  async sendPush(notification: any, data: any, topic: PushType) {
    const callable: (res: any) => Observable<any> = this.fns.httpsCallable(
      'sendPush',
    );
    await callable({
      data,
      notification,
      topic,
    }).toPromise();
  }

  incrementAnalyticsField(field: AnalyticsField, data: any = {}) {
    const now: Date = new Date();
    const increment = firestore.FieldValue.increment(1);
    const analyticsData: any = firestore.FieldValue.arrayUnion({
      ...data,
      timestamp: firebase.firestore.Timestamp.fromDate(now),
      platform: this.utils.getPlatform(),
    });

    this.db.doc('analytics/overall').set(
      {
        [`${field}Count`]: increment,
        [`${field}Data`]: analyticsData,
      },
      { merge: true },
    );
  }

  getKeys() {
    return this.db
      .collection('oneTimeKeyCollection', (ref: any) => ref.orderBy('value'))
      .valueChanges();
  }

  addKey(key: any) {
    return this.db.doc(`oneTimeKeyCollection/${key.value}`).set(key);
  }

  updateKey(key: any) {
    return this.db.doc(`oneTimeKeyCollection/${key.value}`).update({
      remainingKeyCount: key.count,
    });
  }

  getFeedback() {
    return this.db.collection('feedback').valueChanges();
  }

  submitFeedback(feedback: any[]) {
    return this.db.collection('feedback').add({
      feedback: feedback,
      time: firebase.firestore.Timestamp.now(),
      platform: this.utils.getPlatform(),
    });
  }

  getAnalyticsOverview() {
    return this.db.doc('analytics/overall').valueChanges();
  }

  async loadCategories() {
    if (this.ausgaben && this.rubrics) {
      return Promise.resolve();
    } else {
      const categories: any = await this.db
        .collection<Category[]>('categories')
        .valueChanges()
        .pipe(take(1))
        .toPromise();
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
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
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

  getAusgaben(): Ausgabe[] {
    return this.ausgaben;
  }

  getAusgabe(id: string): Ausgabe {
    return this.ausgaben.find((a: Category) => a.id.toString() === id);
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

  async getImpulse(id: string) {
    if (this.impulses) {
      return this.impulses.find((impulse: FirebasePost) => impulse.id === id);
    } else {
      await this.getImpulses().pipe(take(1)).toPromise();
      return this.impulses.find((impulse: FirebasePost) => impulse.id === id);
    }
  }

  updateAusgabe(id: string, data: any) {
    return this.db.doc(`categories/${id}`).update(data);
  }

  updateImpulse(id: string, data: any) {
    return this.db.doc(`impulses/${id}`).update(data);
  }

  updatePost(id: string, data: any) {
    return this.db.doc(`posts/${id}`).update(data);
  }

  getPosts() {
    return new Observable(observer => {
      this.db
        .collection('posts')
        .valueChanges()
        .subscribe((posts: FirebasePost[]) => {
          this.posts = this.getEditedPosts(posts)
            .sort((a: FirebasePost, b: FirebasePost) => {
              if (a.ausgabe && b.ausgabe) {
                if (a.ausgabe.name > b.ausgabe.name) {
                  return 1;
                } else if (a.ausgabe.name < b.ausgabe.name) {
                  return -1;
                }
              } else if (a.ausgabe && !b.ausgabe) {
                return 1;
              } else if (!a.ausgabe && b.ausgabe) {
                return -1;
              }

              if (a.title > b.title) {
                return -1;
              } else if (a.title < b.title) {
                return 1;
              }

              return 0;
            })
            .reverse();
          observer.next(this.posts);
        });
    });
  }

  async getMyPosts(): Promise<FirebasePost[]> {
    await this.getPosts().pipe(take(1)).toPromise();
    const readArticlesString: string | undefined = await this.storage.get(
      'readArticles',
    );

    if (!readArticlesString) {
      return this.posts.slice(0, 14);
    }

    const readArticleIds: string[] = JSON.parse(readArticlesString);
    const readArticles: FirebasePost[] = readArticleIds.map((id: string): FirebasePost => {
      return this.posts.find((post: FirebasePost) => post.id === id);
    });
    let categories: number[] = [];
    let categoryCounts: number[] = [];

    for (const post of readArticles) {
      categories = categories.concat(post.categories);
    }

    categories.forEach((x: number) => { categoryCounts["cat" + x] = (categoryCounts["cat" + x] || 0) + 1; });
    categoryCounts = categoryCounts.sort();

    let myPosts: FirebasePost[] = [];

    for (const cat in categoryCounts) {
      if (myPosts.length > 9) {
        break;
      }

      const catId: number = Number(cat.slice(3));
      const posts: FirebasePost[] = this.posts.filter((post: FirebasePost) =>
        post.categories.includes(catId) && !readArticleIds.includes(post.id)
      );

      if (posts.length > 5) {
        posts.length = 5;
      }

      myPosts = myPosts.concat(posts);
    }

    return this.utils.shuffleArray(myPosts);
  }

  getImpulses() {
    return new Observable(observer => {
      this.db
        .collection('impulses', (ref: any) => ref.orderBy('date', 'desc'))
        .valueChanges()
        .subscribe((impulses: FirebasePost[]) => {
          this.impulses = impulses;
          observer.next(this.impulses);
        });
    });
  }

  getVdt() { // TODO
    return new Observable(observer => {
      this.db
        .collection('vdt', (ref: any) => ref.orderBy('date', 'desc'))
        .valueChanges()
        .subscribe((vdt: FirebasePost[]) => {
          this.vdt = vdt[0];
          observer.next(this.vdt);
        });
    });
  }

  incrementPostViews(id: string) {
    const increment = firestore.FieldValue.increment(1);
    this.db.doc(`posts/${id}`).update({
      views: increment,
    });
  }

  incrementImpulseViews(id: string) {
    const increment = firestore.FieldValue.increment(1);
    this.db.doc(`impulses/${id}`).update({
      views: increment,
    });
  }

  incrementAudioPlays(id: string) {
    const increment = firestore.FieldValue.increment(1);
    this.db.doc(`posts/${id}`).update({
      audioPlays: increment,
    });
  }

  getEditedPosts(posts: FirebasePost[]): FirebasePost[] {
    return posts.map((post: any) => {
      const categroyData: CategoryData = this.utils.getCategoryData(
        post,
        this.rubrics,
        this.ausgaben,
      );
      return {
        ...post,
        rubrik: categroyData.rubrik,
        ausgabe: categroyData.ausgabe
      };
    });
  }

  async loadLegalPages() {
    if (this.legalPages) {
      return;
    }
    this.legalPages = await this.db
      .collection<any[]>('pages')
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }

  async getImprint() {
    await this.loadLegalPages();
    return this.legalPages.find((page: any) => page.id === 'imprint');
  }

  async getDataProt() {
    await this.loadLegalPages();
    return this.legalPages.find((page: any) => page.id === 'dataprot');
  }

  login(email: string, password: string) {
    return new Promise((resolve: any) => {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          fcm.subscribeTo({ topic: 'admin' });
          if (this.subscriber) {
            this.subscriber.next(true);
          }
          this.incrementAnalyticsField(AnalyticsField.ADMIN_LOGGED_IN);
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }

  async isAdmin(): Promise<boolean> {
    const user: any = await this.afAuth.authState.pipe(first()).toPromise();
    if (this.subscriber) {
      this.subscriber.next(Boolean(user));
    }
    return Boolean(user);
  }

  subscribeToAdmin(): Observable<boolean> {
    return new Observable((subscriber: Subscriber<boolean>) => {
      this.subscriber = subscriber;
      this.isAdmin();
    });
  }

  convertBlobToBase64(data: Blob) {
    return new Promise((resolve: any) => {
      let reader = new FileReader();
      reader.readAsDataURL(data);
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
    });
  }

  async getBase64FromUrl(url: string, redirect: boolean = true) {
    return new Promise(async (resolve, reject) => {
      const data: Blob = await this.httpClient
        .get(redirect ? `https://cors.bridged.cc/${url}` : url, {
          responseType: 'blob',
        })
        .toPromise();
      if (data) {
        let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.addEventListener(
          'load',
          () => {
            resolve(reader.result.toString());
          },
          false,
        );
      } else {
        reject(url);
      }
    });
  }

  downloadFile(url: string) {
    return this.httpClient.get(url, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events',
    });
  }

  uploadAudio(file: FileLikeObject, post: FirebasePost) {
    return new Promise((resolve: any) => {
      const path = `/audios/${Date.now()}_${file.name}`;
      const ref = this.fireStorage.ref(path);
      const task = this.fireStorage.upload(path, file.rawFile);

      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            const url = await ref.getDownloadURL().toPromise();
            resolve({
              url,
              path,
              name: file.name,
            });
          }),
        )
        .subscribe();
    });
  }

  uploadPdf(file: FileLikeObject) {
    return new Promise((resolve: any) => {
      const path = `/pdfs/${Date.now()}_${file.name}`;
      const ref = this.fireStorage.ref(path);
      const task = this.fireStorage.upload(path, file.rawFile);

      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            const url = await ref.getDownloadURL().toPromise();
            resolve({
              url,
              path,
            });
          }),
        )
        .subscribe();
    });
  }

  uploadVideoFile(file: FileLikeObject) {
    return new Promise((resolve: any) => {
      const path = `/videos/${Date.now()}_${file.name}`;
      const ref = this.fireStorage.ref(path);
      const task = this.fireStorage.upload(path, file.rawFile);

      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            const url = await ref.getDownloadURL().toPromise();
            resolve({
              url,
              path,
            });
          }),
        )
        .subscribe();
    });
  }

  uploadImageFile(file: FileLikeObject) {
    return new Promise((resolve: any) => {
      const path = `/other/${Date.now()}_${file.name}`;
      const ref = this.fireStorage.ref(path);
      const task = this.fireStorage.upload(path, file.rawFile);

      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            const url = await ref.getDownloadURL().toPromise();
            resolve({
              url,
              path,
            });
          }),
        )
        .subscribe();
    });
  }
}
