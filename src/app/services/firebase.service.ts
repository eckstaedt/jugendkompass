import { Injectable } from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { Observable, Subscriber } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category, FirebasePost, CategoryData } from '../utils/interfaces';
import { Utils } from '../utils/utils';
import { Plugins } from '@capacitor/core';
const { Http } = Plugins;

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

  constructor(
    private db: AngularFirestore,
    private storage: Storage,
    private utils: Utils
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
        .sort((a: Category, b: Category) => b.name > a.name)
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

  async setAdmin() {
    this.subscriber.next(true);
    return await this.storage.set('isAdmin', true);
  }

  async isAdmin(): Promise<boolean> {
    const isAdmin: boolean = Boolean(await this.storage.get('isAdmin'));
    this.subscriber.next(isAdmin);
    return isAdmin;
  }

  subscribeToAdmin(): Observable<boolean> {
    return new Observable((subscriber: Subscriber<boolean>) => {
      this.subscriber = subscriber;
      this.isAdmin();
    });
  }

  async getBase64FromUrl(mediaUrl): Promise<any> {
    return new Promise(async resolve => {
      const res = await Http.downloadFile({
        url: `https://cors.bridged.cc/${mediaUrl}`,
        filePath: mediaUrl,
      });
      let reader = new FileReader();
      reader.readAsDataURL(res.blob);
      reader.addEventListener(
        'load',
        () => {
          resolve(reader.result.toString());
        },
        false,
      );
    });
  }
}
