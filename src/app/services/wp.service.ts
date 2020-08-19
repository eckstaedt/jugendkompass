import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WpService {

  url = `https://stephanus-zeitschrift.de/wp-json/wp/v2/`;
  totalPosts = null;
  pages: any;

  constructor(private http: HttpClient) { }

  // TODO
  getAllPosts() {
    const options = {
      observe: 'response' as 'body',
      params: {
        per_page: '100'
      }
    };

    return this.http.get<any[]>(`${this.url}posts?_embed`, options).pipe(
      map((resp: any) => {
        const data = resp.body;

        for (const post of data) {
          post.media_url = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
        }
        return data;
      })
    );
  }

  getPosts(page = 1): Observable<any[]> {
    const options = {
      observe: 'response' as 'body',
      params: {
        per_page: '10',
        page: '' + page
      }
    };

    return this.http.get<any[]>(`${this.url}posts?_embed`, options).pipe(
      map((resp: any) => {
        this.pages = resp.headers.get('x-wp-totalpages');
        this.totalPosts = parseInt(resp.headers.get('x-wp-total'), 10);

        const data = resp.body;

        for (const post of data) {
          post.media_url = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
        }
        return data;
      })
    );
  }

  getPostContent(id: string) {
    return this.http.get(`${this.url}posts/${id}?_embed`).pipe(
      map((post: any) => {
        post.media_url = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
        return post;
      })
    );
  }

  getPageContent(id: string) {
    return this.http.get(`${this.url}pages/${id}?_embed`).pipe(
      map((page: any) => {
        return page;
      })
    );
  }
}
