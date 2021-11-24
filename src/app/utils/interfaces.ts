import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export enum PostStatus {
  PUBLISH = 'publish',
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
  audio?: {
    name: string;
    path: string;
    url: string;
    duration: string;
    base64?: string;
  };
  pdf?: string;
  isFavorite?: boolean;
  base64Img?: string;
  articleWasRead: boolean;
  audioPlays?: number;
  pushSend?: boolean;
  tags: number[];
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
}

export interface Tag {
  count: number;
  description: string;
  id: string;
  name: string;
  taxonomy: string;
}

export interface Ausgabe extends Category {
  title: string;
  imageUrl: string;
  imagePath?: string;
  content: string;
  pushSend?: boolean;
  pdfUrl?: string;
  pdfPath?: string;
  videos: {
    name: string;
    url: string;
    image: string;
    videoPath?: string;
    imagePath?: string;
  }[];
}

export interface CategoryData {
  rubrik: Category | undefined;
  ausgabe: Category | undefined;
}
