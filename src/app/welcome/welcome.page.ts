import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  mode = 'bright';

  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  toHome() {
    this.storage.set('oldUser', true);
    this.router.navigateByUrl('/tabs');
  }

  onThemeChange() {
    this.storage.set('darkMode', Boolean(this.mode === 'bright'));
    document.body.classList.toggle('dark', Boolean(this.mode === 'bright'));
  }

}
