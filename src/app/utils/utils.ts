import { ToastController, ModalController, Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { CategoryData, Category, FirebasePost } from './interfaces';
import { Platforms } from './constants';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private platform: Platform,
  ) {}

  async showToast(text: string, status: string = 'danger', p: any = 'bottom') {
    const toast = await this.toastController.create({
      message: text,
      color: status,
      position: p,
      duration: 2000,
    });

    toast.present();
  }

  getMinString(time: number): string {
    const hours: number | string = Math.floor(time / 3600);
    let minutes: number | string = Math.floor((time - hours * 3600) / 60);
    let seconds: number | string = time - hours * 3600 - minutes * 60;

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }

  getPlatform(): Platforms {
    if (this.platform.is('capacitor')) {
      if (this.platform.is('ios')) {
        return this.platform.is('ipad') ? Platforms.IPAD : Platforms.IPHONE;
      } else if (this.platform.is('android')) {
        return this.platform.is('tablet')
          ? Platforms.ANDROID_TABLET
          : Platforms.ANDROID_PHONE;
      } else {
        return Platforms.OTHER;
      }
    } else {
      return Platforms.WEB;
    }
  }

  getCategoryData(
    post: FirebasePost,
    rubriken: Category[],
    ausgaben: Category[],
  ): CategoryData {
    let ausgabe: Category | undefined;
    let rubrik: Category | undefined;

    for (const cat of post.categories) {
      if (Boolean(rubriken.find((rub: any) => rub.id === cat.toString()))) {
        rubrik = rubriken.find((rub: any) => rub.id === cat.toString());
      }
      if (Boolean(ausgaben.find((aus: any) => aus.id === cat.toString()))) {
        ausgabe = ausgaben.find((aus: any) => aus.id === cat.toString());
      }
    }

    return {
      ausgabe: ausgabe,
      rubrik: rubrik,
    };
  }
}
