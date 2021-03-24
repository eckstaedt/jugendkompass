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

//kein Plan, wofür wir die ganzen Properties in Post brauchen...
export interface Post {
  articleWasRead?: boolean;
  audio?: any;
  author?: any;
  base64Img?: any;
  base64Audio?: any;
  categories?: any[];
  category?: any;
  comment_status?: string;
  content: {
    protected: boolean;
    rendered: string;
  };
  date?: string;
  date_gmt?: string;
  excerpt?: {
    protected: boolean;
    rendered: string;
  };
  featured_media?: number;
  format?: string;
  guid?: { rendered: string };
  id?: number;
  isFavorite?: boolean;
  link?: string;
  media_url?: string;
  meta?: any[];
  modified?: string;
  modified_gmt?: string;
  pdf?: string;
  ping_status?: string;
  rubrik?: Category;
  ausgabe?: Category;
  slug?: string;
  status?: string;
  sticky?: boolean;
  tags?: any[];
  template?: string;
  title: { rendered: string };
  type?: string;
  views?: number;
  _embedded?: {
    'author': any[];
    'wp:featuredmedia': any[];
    'wp:term': any[];
  };
  _links?: {
    'about': any[];
    'author': any[];
    'collection': any[];
    'curies': any[];
    'predecessor-version': any[];
    'replies': any[];
    'self': any[];
    'version-history': any[];
    'wp:attachment': any[];
    'wp:featuredmedia': any[];
    'wp:term': any[];
  };
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
  _embedded: any;
  _links: any;
}

export interface CategoryData {
  rubrik: Category | undefined;
  ausgabe: Category | undefined;
}
