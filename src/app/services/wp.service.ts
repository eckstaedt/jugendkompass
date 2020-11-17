import { Injectable } from '@angular/core';
import '@capacitor-community/http';

import { Plugins } from '@capacitor/core';
const { Http } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class WpService {

  url = `https://stephanus-zeitschrift.de/wp-json/wp/v2/`;
  totalPosts = null;
  pages: any;

  constructor() { }

  // TODO
  getAllPosts() {
    return Http.request({
      method: 'GET',
      url: `${this.url}posts?_embed&per_page=100`
    });
  }

  getPosts(page = 1) {
    return Http.request({
      method: 'GET',
      url: `${this.url}posts?_embed&per_page=10&page=${'' + page}`
    });
  }

  getPostContent(id: string) {
    return Http.request({
      method: 'GET',
      url: `${this.url}posts/${id}?_embed`
    });
  }

  getPageContent(id: string) {
    return Http.request({
      method: 'GET',
      url: `${this.url}pages/${id}?_embed`
    });
  }

  getCategories() {
    return Http.request({
      method: 'GET',
      url: `${this.url}categories?_embed&per_page=100`
    });
  }
}
