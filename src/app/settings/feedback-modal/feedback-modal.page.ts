import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.page.html',
  styleUrls: ['./feedback-modal.page.scss'],
})
export class FeedbackModalPage implements OnInit {

  selected = 1;
  feedback: { id: number, question: string, answer?: string, options?: any[] }[] = [{
    id: 1,
    question: 'Welche geistliche Themen würdest du gerne im Jugendkompass sehen?',
    answer: ''
  }, {
    id: 2,
    question: 'Gibt es Bibelstellen, die du näher erklärt haben möchtest?',
    answer: ''
  }, {
    id: 3,
    question: 'Was denkst du, bewegt die Jugend momentan?',
    answer: ''
  }, {
    id: 4,
    question: 'Welche Funktionen für die App wünschst du dir in Zukunft?',
    answer: ''
  }, {
    id: 5,
    question: 'Sind dir Funktionen aufgefallen, die in der App nicht so gut funktionieren und die man verbessern könnte? Wenn ja, welche?',
    answer: ''
  }, {
    id: 6,
    question: 'Ist die App deiner Meinung nach eine gute Alternative zum Telegram-Kanal bzw. der Print-Ausgabe?',
    options: [{
      id: 1,
      value: 'Keine Angabe',
      selected: false
    }, {
      id: 2,
      value: 'Die Print-Ausgabe reicht mir aus',
      selected: false
    }, {
      id: 3,
      value: 'Ich bevorzuge Telegram',
      selected: false
    }, {
      id: 4,
      value: 'Die App ist eine gute Alternative',
      selected: false
    }]
  }, {
    id: 99,
    question: 'Sonstige Vorschläge/Anliegen?',
    answer: ''
  }];

  constructor(
    private modalController: ModalController,
    private firebaseService: FirebaseService,
    private storage: Storage,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async submit() {
    if (this.isValid()) {
      this.feedback[5].options[this.selected - 1].selected = true;
      this.firebaseService.submitFeedback(this.feedback).then(async () => {
        const toast = await this.toastController.create({
          message: 'Vielen dank für dein Feedback!',
          color: 'success',
          position: 'bottom',
          duration: 2000,
        });
    
        toast.present();
        await this.storage.set('hasFeedbackSend', true);
        this.close(true);
      }).catch(async () => {
        const toast = await this.toastController.create({
          message: 'Fehler beim Senden des Feedbacks. Probiere es später erneut.',
          color: 'danger',
          position: 'bottom',
          duration: 2000,
        });
    
        toast.present();
      });
    } else {
      const toast = await this.toastController.create({
        message: 'Bitte gebe mindestens eine Antwort ein...',
        color: 'danger',
        position: 'bottom',
        duration: 2000,
      });
  
      toast.present();
    }
  }

  isValid(): boolean {
    if (this.selected !== 1) {
      return true;
    }
    for (const f of this.feedback) {
      if (f.answer) {
        return true;
      }
    }
    return false;
  }

  close(feedbackSend: boolean = false) {
    this.modalController.dismiss(feedbackSend);
  }

}
