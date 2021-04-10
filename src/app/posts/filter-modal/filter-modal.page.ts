import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/utils/interfaces';
import { WpService } from 'src/app/services/wp.service';

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
    private wpService: WpService
  ) { }

  async ngOnInit() {
    await this.wpService.getCategories();
    this.ausgaben = this.wpService.getAusgaben();
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
  }

  dismiss(filterObject?: any): void {
    this.modalController.dismiss({
      filterObject: filterObject
    });
  }

}
