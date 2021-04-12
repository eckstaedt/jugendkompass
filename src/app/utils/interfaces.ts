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

export enum PostStatus {
  PUBLISH = 'publish'
}

export interface FirebasePost {
  content: string;
  categories: number[];
  date: string;
  excerpt: string;
  id: string;
  link: string;
  modified: string;
  postImg: {
    source_url: string;
  };
  status: PostStatus;
  title: string;
  type: string;
  wpViews: number;
  views: number;
  ausgabe?: Category;
  rubrik?: Category;
  base64Audio?: string;
  audio?: string;
  pdf?: string;
  isFavorite?: boolean;
  base64Img?: string;
  articleWasRead: boolean;
  audioPlays?: number;
}

export interface Category {
  count: number;
  description: string;
  id: number;
  link: string;
  meta: any[];
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
  _embedded?: any;
  _links?: any;
}

export interface CategoryData {
  rubrik: Category | undefined;
  ausgabe: Category | undefined;
}
