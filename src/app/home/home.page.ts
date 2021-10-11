import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  verse: any;

  constructor(
    private service: FirebaseService
  ) { }

  async ngOnInit() {
    this.verse = await this.service.getVerseOfTheDay();
  }

}
