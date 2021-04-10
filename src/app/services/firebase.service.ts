import { Injectable } from '@angular/core';
// import {
//   AngularFirestore,
//   AngularFirestoreCollection,
// } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  subscriber: Subscriber<boolean>;

  constructor(
    // private db: AngularFirestore,
    private storage: Storage
  ) {}

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
}
