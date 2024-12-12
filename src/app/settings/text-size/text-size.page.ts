import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-text-size',
  templateUrl: './text-size.page.html',
  styleUrls: ['./text-size.page.scss'],
})
export class TextSizePage implements OnInit {
  public textSize = 15;

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.storage
      .get('text-size')
      .then((textSize: number) => {
        if (textSize) {
          this.textSize = textSize;
        } else {
          this.textSize = 15;
        }
      })
      .catch(() => {
        this.textSize = 15;
      });
  }

  changeFontSize() {
    this.storage.set('text-size', this.textSize);
  }
}
