import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import '@capacitor-community/http';

import { Plugins } from '@capacitor/core';
const { Http } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class WpService {

  url = `http://eckstaedt-webdesign.com/wp-json/wp/v2/`;
  totalPosts = null;
  pages: any;

  constructor(private httpClient: HttpClient) { }

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
      url: `${this.url}categories`
    });
  }

  getBase64ImgFromUrl(imageUrl): Promise<string> {
    return new Promise(resolve => {
      this.httpClient.get(imageUrl, {responseType: 'blob'}).toPromise().then((blob: Blob) => {
        if(blob){
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.addEventListener("load", () => {
            resolve(reader.result.toString());
          }, false);
        } 
      });
    }); 
  }
}
