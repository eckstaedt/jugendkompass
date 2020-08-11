import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private darkMode = false;

  constructor(
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('darkMode').then((res: boolean) => {
      this.darkMode = res;
    }).catch(() => {
      this.darkMode = false;
    });
  }

  toggleMode() {
    this.storage.set('darkMode', this.darkMode);
    document.body.classList.toggle('dark', this.darkMode);
  }

  openMail() {
    window.open('mailto:nikolauswall@gmail.com', '_blank');
  }

}
