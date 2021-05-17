import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.page.html',
  styleUrls: ['./imprint.page.scss'],
})
export class ImprintPage implements OnInit {
  public imprint: any;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.getImprint();
  }

  async getImprint() {
    this.imprint = await this.firebaseService.getImprint();
  }
}
