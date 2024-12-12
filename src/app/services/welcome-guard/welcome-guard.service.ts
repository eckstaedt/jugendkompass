import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class WelcomeGuardService  {
  constructor(private router: Router, private storage: Storage, private plt: Platform) {}

  canActivate() {
    return new Promise<boolean>((resolve: any) => {
      if (!this.plt.is("capacitor")) {
        this.router.navigateByUrl('/tabs');
        resolve(false);
      }
      this.storage
        .get('oldUser')
        .then((old: boolean) => {
          if (old) {
            this.router.navigateByUrl('/tabs');
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(() => {
          this.router.navigateByUrl('/tabs');
          resolve(false);
        });
    });
  }
}
