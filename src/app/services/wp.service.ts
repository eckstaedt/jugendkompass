import { Injectable } from '@angular/core';
import '@capacitor-community/http';

import { Http } from '@capacitor-community/http';
import { Utils } from '../utils/utils';
import { Category } from '../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WpService {

  url = `https://eckstaedt-webdesign.com/wp-json/wp/v2/`;
  totalPosts = null;
  pages: any;
  ausgaben: Category[] = [];
  rubriken: Category[] = [];

  constructor(
    private utils: Utils,
  ) { }

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
    return new Promise((resolve: any, reject: any) => {
      if (this.ausgaben.length) {
        resolve();
      } else {
        Http.request({
          method: 'GET',
          url: `${this.url}categories?_embed&per_page=100`
        }).then((categories: any) => {
          if (categories.data) {
            const ausgabenCategory = categories.data.find((cat: any) => cat.name === 'Ausgaben');
            const rubrikenCategory = categories.data.find((cat: any) => cat.name === 'Rubriken');
            this.ausgaben = categories.data
              .filter((cat: Category) => cat.parent === ausgabenCategory.id && cat.count !== 0)
              .sort((a: Category, b: Category) => b.id - a.id);
            this.rubriken = categories.data
              .filter((cat: Category) => cat.parent === rubrikenCategory.id && cat.count !== 0)
              .sort((a: Category, b: Category) => a.id - b.id);
          }
          resolve();
        }).catch(() => {
          this.utils.showToast('Fehler beim Laden der Kategorien');
          reject();
        });
      }
    });
  }

  getAusgaben(): Category[] {
    return this.ausgaben;
  }

  getRubriken(): Category[] {
    return this.rubriken;
  }

  async getBase64ImgFromUrl(imageUrl): Promise<any> {
    return new Promise(async resolve => {
      const res = await Http.downloadFile({
        url: `https://cors.bridged.cc/${imageUrl}`,
        filePath: imageUrl
      });
      let reader = new FileReader();
      reader.readAsDataURL(res.blob);
      reader.addEventListener("load", () => {
        resolve(reader.result.toString());
      }, false);
    });
  }
}
