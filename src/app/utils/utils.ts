import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { WpService } from '../services/wp.service';
import { Post, CategoryData, Category } from './interfaces';

@Injectable({
    providedIn: 'root'
})
export class Utils {
    constructor(
      private toastController: ToastController
    ) {}

    async showToast(text: string, status: string = 'danger', p: any = 'bottom') {
      const toast = await this.toastController.create({
        message: text,
        color: status,
        position: p,
        duration: 2000
      });

      toast.present();
    }

    getCategoryData(post: Post, rubriken: Category[], ausgaben: Category[]): CategoryData {
      let ausgabe: Category | undefined;
      let rubrik: Category | undefined;
  
      for (const cat of post.categories) {
        if (Boolean(rubriken.find((rub: any) => rub.id === cat))) {
          rubrik = rubriken.find((rub: any) => rub.id === cat);
        }
        if (Boolean(ausgaben.find((aus: any) => aus.id === cat))) {
          ausgabe = ausgaben.find((aus: any) => aus.id === cat);
        }
      }
  
      return {
        ausgabe: ausgabe,
        rubrik: rubrik,
      }
    }
}
