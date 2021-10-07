import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { FirebasePost } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-impulse-list',
  templateUrl: './impulse-list.page.html',
  styleUrls: ['./impulse-list.page.scss'],
})
export class ImpulseListPage implements OnInit {

  impulses: FirebasePost[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.loadImpulses();
  }

  async loadImpulses() {
    this.firebaseService.getImpulses().subscribe(async (impulses: FirebasePost[]) => {
      await this.getReadImpulses();
      this.impulses = impulses;
    });
  }

  async getReadImpulses() { // TODO

  }

}
