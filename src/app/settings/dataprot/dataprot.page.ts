import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-dataprot',
  templateUrl: './dataprot.page.html',
  styleUrls: ['./dataprot.page.scss'],
})
export class DataprotPage implements OnInit {
  public dataProt: any;

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.getImprint();
  }

  async getImprint() {
    this.dataProt = await this.firebaseService.getDataProt();
  }
}
