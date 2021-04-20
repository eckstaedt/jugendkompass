import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-answers-modal',
  templateUrl: './answers-modal.page.html',
  styleUrls: ['./answers-modal.page.scss'],
})
export class AnswersModalPage implements OnInit {
  @Input() answer: any;
  selected;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.selected = this.answer.feedback[5].options.find((opts: any) => opts.selected).id;
  }

  close() {
    this.modalController.dismiss();
  }

}
