import { ToastController, ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { WpService } from '../services/wp.service';
import { Post, CategoryData, Category } from './interfaces';
import { FeedbackModalPage } from '../settings/feedback-modal/feedback-modal.page';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor(
    private toastController: ToastController,
    private modalController: ModalController
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

  async openFeedbackModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: FeedbackModalPage
    });

    await modal.present();
  }

  getCategoryData(
    post: Post,
    rubriken: Category[],
    ausgaben: Category[],
  ): CategoryData {
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
    };
  }
}
