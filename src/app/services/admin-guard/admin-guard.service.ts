import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService  {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
  ) {}

  async canLoad(): Promise<boolean> {
    const isAdmin: boolean = await this.firebaseService.isAdmin();

    if (isAdmin) {
      return true;
    } else {
      this.router.navigateByUrl('/tabs/settings');
      return false;
    }
  }
}
