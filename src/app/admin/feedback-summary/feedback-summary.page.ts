import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { AnswersModalPage } from 'src/app/settings/answers-modal/answers-modal.page';

@Component({
  selector: 'app-feedback-summary',
  templateUrl: './feedback-summary.page.html',
  styleUrls: ['./feedback-summary.page.scss'],
})
export class FeedbackSummaryPage implements OnInit {

  public feedback$: Observable<any[]>;;

  constructor(
    private firebaseService: FirebaseService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.feedback$ = this.firebaseService.getFeedback();
  }

  async openModal(feedback: any) {
    const modal: any = await this.modalController.create({
      component: AnswersModalPage,
      componentProps: {
        answer: feedback
      }
    });

    modal.present();
  }

}
