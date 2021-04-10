import { Injectable } from '@angular/core';
import { Category } from '../utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private category: Category;

  constructor() {}

  setData(category: Category) {
    this.category = category;
  }

  getData() {
    return this.category;
  }
}
