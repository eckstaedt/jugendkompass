import { Injectable } from '@angular/core';
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
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AnalyticsField, PushType } from '../../utils/constants';
import { FileLikeObject } from 'ng2-file-upload';
import { getDownloadURL, Storage, ref, uploadBytesResumable, UploadTask } from '@angular/fire/storage';
import { Functions, httpsCallable, HttpsCallableResult } from '@angular/fire/functions';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, docData, updateDoc, collectionData, addDoc } from '@angular/fire/firestore';

const fcm = new FCM();

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  subscriber: Subscriber<boolean>;
  rubrics: Category[];
  ausgaben: Ausgabe[];
  readArticles: FirebasePost[] = [];
  posts: FirebasePost[];
  impulses: FirebasePost[];
  categories: Category[];
  legalPages: any[];

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private functions: Functions,
    private storage: Storage,
    private utils: Utils,
    private httpClient: HttpClient,
  ) {
    this.init();
  }

  async init() {
    await this.loadCategories();
  }

  async sendTestPush(notification: any, data: any) {
    const callable: (res: any) => Promise<HttpsCallableResult> = httpsCallable(
      this.functions,
      'sendTestPush',
    );
    await callable({
      data: data,
      notification: notification,
    });
  }

  async sendPush(notification: any, data: any, topic: PushType) {
    const callable: (res: any) => Promise<HttpsCallableResult> = httpsCallable(
      this.functions,
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
    const increment = firebase.firestore.FieldValue.increment(1);
    const analyticsData: any = firebase.firestore.FieldValue.arrayUnion({
      ...data,
      timestamp: firebase.firestore.Timestamp.fromDate(now),
      platform: this.utils.getPlatform(),
    });

    setDoc(doc(this.firestore, 'analytics/overall'), {
        [`${field}Count`]: increment,
        [`${field}Data`]: analyticsData,
      },
      { merge: true },
    );
  }

  getFeedback() {
    return collectionData(collection(this.firestore, 'feedback'));
  }

  submitFeedback(feedback: any[]) {
    return addDoc(collection(this.firestore, 'feedback'), {
      feedback: feedback,
      time: firebase.firestore.Timestamp.now(),
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
      const categories: any = await collectionData(collection(this.firestore, 'categories'))
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

  getImpulses() {
    return new Observable(observer => {
      collectionData(collection(this.firestore, 'impulses'))
        .subscribe((impulses: FirebasePost[]) => {
          this.impulses = impulses;
          observer.next(this.impulses);
        });
    });
  }

  incrementPostViews(id: string) {
    const increment = firebase.firestore.FieldValue.increment(1);
    updateDoc(doc(this.firestore, `posts/${id}`), {
      views: increment,
    });
  }

  incrementImpulseViews(id: string) {
    const increment = firebase.firestore.FieldValue.increment(1);
    updateDoc(doc(this.firestore, `impulses/${id}`), {
      views: increment,
    });
  }

  incrementAudioPlays(id: string) {
    const increment = firebase.firestore.FieldValue.increment(1);
    updateDoc(doc(this.firestore, `posts/${id}`), {
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
    this.legalPages = await collectionData(collection(this.firestore, 'pages'))
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
      signInWithEmailAndPassword(this.auth, email, password)
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
    const user: any = await authState(this.auth).pipe(first() as any).toPromise();
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

  getVerseOfTheDay() {
    return new Promise(async (resolve: any) => {
      const data: any = await this.httpClient.jsonp("https://dailyverses.net/getdailyverse.ashx?language=lut", "callback").toPromise();
      resolve(data?.html.replace("<a ", "<div class='bible' ").replace("</a>", "</div>") ?? '');
    });
  }

  downloadFile(url: string) {
    return this.httpClient.get(url, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events',
    });
  }

  uploadAudio(file: FileLikeObject) {
    return new Promise(async (resolve: any) => {
      const path = `/audios/${Date.now()}_${file.name}`;
      const reference = ref(this.storage, path);
      const task: UploadTask = uploadBytesResumable(reference, new File([file.rawFile], file.name));

      await task;

      const url = await getDownloadURL(reference);
      resolve({
        url,
        path,
        name: file.name,
      });
    });
  }

  uploadPdf(file: FileLikeObject) {
    return new Promise(async (resolve: any) => {
      const path = `/pdfs/${Date.now()}_${file.name}`;
      const reference = ref(this.storage, path);
      const task: UploadTask = uploadBytesResumable(reference, new File([file.rawFile], file.name));

      await task;

      const url = await getDownloadURL(reference);
      resolve({
        url,
        path,
      });
    });
  }

  uploadVideoFile(file: FileLikeObject) {
    return new Promise(async (resolve: any) => {
      const path = `/videos/${Date.now()}_${file.name}`;
      const reference = ref(this.storage, path);
      const task: UploadTask = uploadBytesResumable(reference, new File([file.rawFile], file.name));

      await task;

      const url = await getDownloadURL(reference);
      resolve({
        url,
        path,
      });
    });
  }

  uploadImageFile(file: FileLikeObject) {
    return new Promise(async (resolve: any) => {
      const path = `/other/${Date.now()}_${file.name}`;
      const reference = ref(this.storage, path);
      const task: UploadTask = uploadBytesResumable(reference, new File([file.rawFile], file.name));

      await task;

      const url = await getDownloadURL(reference);
      resolve({
        url,
        path,
      });
    });
  }
}
