import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CalendarDate } from '../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  datesCollection: AngularFirestoreCollection<CalendarDate>;

  constructor(
    private db: AngularFirestore
  ) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.datesCollection = this.db.collection<CalendarDate>(
      'dates',
      (ref: any) => ref.where('end', '>=', yesterday).orderBy('end')
    );
  }

  getDates(): AngularFirestoreCollection<CalendarDate> {
    return this.datesCollection;
  }
}
