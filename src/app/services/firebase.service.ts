import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CalendarDate } from '../utils/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  datesCollection: AngularFirestoreCollection<CalendarDate>;

  constructor(
    private db: AngularFirestore
  ) {
    this.datesCollection = this.db.collection<CalendarDate>(
      'dates',
      (ref: any) => ref.where('end', '>=', new Date()).orderBy('end')
    );
  }

  getDates(): AngularFirestoreCollection<CalendarDate> {
    return this.datesCollection;
  }
}
