import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

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
}
