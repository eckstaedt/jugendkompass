import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.page.html',
  styleUrls: ['./dates.page.scss'],
})
export class DatesPage implements OnInit {

  dates: any[] = [{
    name: 'Missionskonferenz',
    date: new Date('2020-06-12')
  }, {
    name: 'Regionale Brüderkonferenz (Raum Bremen)',
    date: new Date('2020-08-14')
  }, {
    name: 'Regionale Brüderkonferenz (Raum Bremen)',
    date: new Date('2020-09-10')
  }, {
    name: 'Jugendtreff (Norden)',
    date: new Date('2020-09-20')
  }, {
    name: 'Jugendtreff (Süden)',
    date: new Date('2020-09-27')
  }, {
    name: 'Ender der Weihnachtsaktion',
    date: new Date('2020-12-12')
  }];

  constructor() { }

  ngOnInit() {
  }

  refresh(event: any) {
    event.target.complete();
  }

}
