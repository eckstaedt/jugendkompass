import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-push',
  templateUrl: './push.page.html',
  styleUrls: ['./push.page.scss'],
})
export class PushPage implements OnInit {

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  sendTestPush() {
    this.firebaseService.sendTestPush();
  }

}
