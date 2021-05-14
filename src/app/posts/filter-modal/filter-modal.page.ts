import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/utils/interfaces';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AnalyticsField } from 'src/app/utils/constants';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage implements OnInit {
  @Input("showOnlyUnread") showOnlyUnread;
  @Input("ausgabe") ausgabe;

  public ausgaben: Category[] = [];
  public selectedAusgabe: string = "all";

  constructor(
    private modalController: ModalController,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.ausgaben = this.firebaseService.getAusgaben();
    this.selectedAusgabe = this.ausgabe;
  }

  selectAusgabe(id: string): void {
    this.selectedAusgabe = id;
  }

  async apply(): Promise<void> {
    this.dismiss({
      showOnlyUnread: this.showOnlyUnread,
      ausgabe: this.selectedAusgabe
    });
    this.firebaseService.incrementAnalyticsField(AnalyticsField.FILTER_MODAL_APPLIED);
  }

  dismiss(filterObject?: any): void {
    this.modalController.dismiss({
      filterObject: filterObject
    });
  }

}
