import * as firebase from 'firebase/app';

export interface CalendarDate {
    name: string;
    start: firebase.firestore.Timestamp;
    startUnix: number;
    end: firebase.firestore.Timestamp;
    endUnix: number;
    location?: string;
    lat?: number;
    long?: number;
}
