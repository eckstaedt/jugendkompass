import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, getDoc, limit, orderBy, query, setDoc, Timestamp, updateDoc } from '@angular/fire/firestore';
import { Observable, Subscriber } from 'rxjs';
import { take, first } from 'rxjs/operators';
import {
  Category,
  FirebasePost,
  CategoryData,
  Ausgabe,
} from '../../utils/interfaces';
import { Utils } from '../../utils/utils';
import { HttpClient } from '@angular/common/http';
import { FCM } from '@capacitor-community/fcm';
import { AnalyticsField, PushType } from '../../utils/constants';
import { FileLikeObject } from 'ng2-file-upload';
import { Functions, HttpsCallable, httpsCallable } from '@angular/fire/functions';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { arrayUnion, increment } from "firebase/firestore";
import { Analytics, logEvent } from "@angular/fire/analytics";

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  subscriber: Subscriber<boolean>;
  rubrics: Category[];
  ausgaben: Ausgabe[];
  posts: FirebasePost[];
  impulses: FirebasePost[];
  categories: Category[];
  legalPages: any[];

  constructor(
    private firestore: Firestore,
    private fireStorage: Storage,
    private analytics: Analytics,
    private utils: Utils,
    private httpClient: HttpClient,
    private fns: Functions,
    private afAuth: Auth,
  ) {
    this.init();
  }

  async init() {
    await this.loadCategories();
  }

  async sendTestPush(notification, data) {
    const callable: HttpsCallable<any, unknown> = httpsCallable(
      this.fns,
      'sendTestPush',
    );
    await callable({
      data: data,
      notification: notification,
    });
  }

  async sendPush(notification: any, data: any, topic: PushType) {
    const callable: HttpsCallable<any, unknown> = httpsCallable(
      this.fns,
      'sendPush',
    );
    await callable({
      data,
      notification,
      topic,
    });
  }

  incrementAnalyticsField(field: AnalyticsField, data: any = {}) {
    const now: Date = new Date();
    const analyticsData: any = arrayUnion({
      ...data,
      timestamp: Timestamp.fromDate(now),
      platform: this.utils.getPlatform(),
    });
    this.logAnalyticsEvent(field, { ...data, platform: this.utils.getPlatform() });

    setDoc(doc(this.firestore, 'analytics/overall'),
      {
        [`${field}Count`]: increment(1),
        [`${field}Data`]: analyticsData,
      },
      { merge: true },
    );
  }

  async logAnalyticsEvent(event: string, data: any = {}) {
    logEvent(this.analytics, event, data);
  }

  getFeedback() {
    return collectionData(query(collection(this.firestore, 'feedback'), orderBy("time", "desc")));
  }

  submitFeedback(feedback: any[]) {
    return addDoc(collection(this.firestore, "feedback"), {
      feedback: feedback,
      time: Timestamp.now(),
      platform: this.utils.getPlatform(),
    });
  }

  getAnalyticsOverview() {
    return docData(doc(this.firestore, 'analytics/overall'));
  }

  async loadCategories() {
    if (this.ausgaben && this.rubrics) {
      return Promise.resolve();
    } else {
      const categories: any = await
        collectionData(collection(this.firestore, 'categories'))
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
            cat.parent?.toString() === ausgabenCategory?.id && cat.count !== 0,
        )
        .sort((a: Category, b: Category) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        })
        .reverse();
      this.rubrics = categories
        .filter(
          (cat: Category) =>
            cat.parent?.toString() === rubrikenCategory?.id && cat.count !== 0,
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
    return updateDoc(doc(this.firestore, `categories/${id}`), data);
  }

  updateImpulse(id: string, data: any) {
    return updateDoc(doc(this.firestore, `impulses/${id}`), data);
  }

  updatePost(id: string, data: any) {
    return updateDoc(doc(this.firestore, `posts/${id}`), data);
  }

  getPosts() {
    return new Observable(observer => {
      collectionData(collection(this.firestore, 'posts'))
        .subscribe((posts: FirebasePost[]) => {
          this.posts = this.getEditedPosts(posts)
            .sort((a: FirebasePost, b: FirebasePost) => {
              if (a.ausgabe && b.ausgabe) {
                if (a.ausgabe.id > b.ausgabe.id) {
                  return 1;
                } else if (a.ausgabe.id < b.ausgabe.id) {
                  return -1;
                }
              } else if (a.ausgabe && !b.ausgabe) {
                return 1;
              } else if (!a.ausgabe && b.ausgabe) {
                return -1;
              }

              if (a.rubrik && b.rubrik) {
                if (a.rubrik.id < b.rubrik.id) {
                  return 1;
                } else if (a.rubrik.id > b.rubrik.id) {
                  return -1;
                }
              } else if (a.rubrik && !b.rubrik) {
                return 1;
              } else if (!a.rubrik && b.rubrik) {
                return -1;
              }

              return 0;
            })
            .reverse();
          observer.next(this.posts);
        });
    });
  }
  async getMyPosts(readArticlesString?: string): Promise<FirebasePost[]> {
    await this.loadCategories();
    await this.getPosts().pipe(take(1)).toPromise();

    if (!readArticlesString) {
      return this.posts.slice(0, 14);
    }

    const readArticleIds: string[] = JSON.parse(readArticlesString);
    const readArticles: FirebasePost[] = readArticleIds.map((id: string): FirebasePost => {
      return this.posts.find((post: FirebasePost) => post.id === id);
    });
    const categories: number[] = [];
    let categoryCounts: number[] = [];

    for (const post of readArticles) {
      if (post?.rubrik?.name) {
        categories.push(Number(post.rubrik.id));
      }
    }

    categories.forEach((x: number) => { categoryCounts["cat" + x] = (categoryCounts["cat" + x] || 0) + 1; });
    categoryCounts = categoryCounts.sort();

    let myPosts: FirebasePost[] = [];
    let count: number = 5;

    for (const cat in categoryCounts) {

      if (myPosts.length > 9) {
        break;
      }

      const catId: number = Number(cat.slice(3));
      const posts: FirebasePost[] = this.posts.filter((post: FirebasePost) =>
        post.categories.includes(catId) && !readArticleIds.includes(post.id)
      );

      if (posts.length > count) {
        posts.length = count;
      }

      count--;
      myPosts = myPosts.concat(posts);
    }

    return this.utils.shuffleArray(myPosts);
  }

  getImpulses() {
    return new Observable(observer => {
      collectionData(
        query(
          collection(this.firestore, 'impulses'),
          orderBy("date", "desc"),
          limit(1)
        )
      ).subscribe((impulses: FirebasePost[]) => {
        this.impulses = impulses;
        observer.next(impulses);
      });
    });
  }

  getVdt() {
    return new Observable(observer => {
      collectionData(
        query(
          collection(this.firestore, "vdt"),
          orderBy('date', 'desc'),
          limit(1),
        )
      ).subscribe((vdt: any[]) => {
        observer.next(vdt[0]);
      });
    });
  }

  incrementPostViews(id: string) {
    updateDoc(doc(this.firestore, `posts/${id}`), {
      views: increment(1),
    });
  }

  incrementImpulseViews(id: string) {
    updateDoc(doc(this.firestore, `impulses/${id}`), {
      views: increment(1),
    });
  }

  incrementAudioPlays(id: string) {
    updateDoc(doc(this.firestore, `posts/${id}`), {
      audioPlays: increment(1),
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
    this.legalPages = await
      collectionData(collection(this.firestore, "pages"))
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
      signInWithEmailAndPassword(this.afAuth, email, password)
        .then(() => {
          FCM.subscribeTo({ topic: 'admin' });
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
    const user: any = await authState(this.afAuth).pipe(first()).toPromise();
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

  async getBase64FromUrl(url: string) {
    return new Promise(async (resolve, reject) => {
      const data: Blob = await this.httpClient
        .get(url, {
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
    return new Promise(async (resolve: any) => {
      const path = `/audios/${Date.now()}_${file.name}`;
      const r = ref(this.fireStorage, path);
      await uploadString(r, String(file.rawFile));

      resolve({
        url: getDownloadURL(r),
        path,
        name: file.name,
      });
    });
  }

  uploadPdf(file: FileLikeObject) {
    return new Promise(async (resolve: any) => {
      const path = `/pdfs/${Date.now()}_${file.name}`;
      const r = ref(this.fireStorage, path);
      await uploadString(r, String(file.rawFile));

      resolve({
        url: getDownloadURL(r),
        path,
      });
    });
  }

  uploadVideoFile(file: FileLikeObject) {
    return new Promise((resolve: any) => {
      const path = `/videos/${Date.now()}_${file.name}`;
      const r = ref(this.fireStorage, path);
      const task = uploadString(r, String(file.rawFile));

      resolve({
        url: getDownloadURL(r),
        path,
      });
    });
  }

  uploadImageFile(file: FileLikeObject) {
    return new Promise((resolve: any) => {
      const path = `/other/${Date.now()}_${file.name}`;
      const r = ref(this.fireStorage, path);
      const task = uploadString(r, String(file.rawFile));

      resolve({
        url: getDownloadURL(r),
        path,
      });
    });
  }
}
