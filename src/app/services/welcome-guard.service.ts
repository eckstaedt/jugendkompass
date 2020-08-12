import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuardService implements CanActivate {

  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  canActivate() {
    return new Promise<boolean>((resolve: any) => {
      this.storage.get('oldUser').then((old: boolean) => {
        if (old) {
          this.router.navigateByUrl('/tabs');
          resolve(false);
        } else {
          resolve(true);
        }
      }).catch(() => {
        this.router.navigateByUrl('/tabs');
        resolve(false);
      });
    });
  }
}
