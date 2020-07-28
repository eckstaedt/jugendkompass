import { Component, OnInit } from '@angular/core';
import { NgAddToCalendarService } from '@trademe/ng-add-to-calendar';
import * as moment from 'moment';
import { ActionSheetController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

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
    name: 'Regionale Brüderkonferenz (Raum Speyer)',
    date: new Date('2020-09-10')
  }, {
    name: 'Jugendtreff (Norden)',
    date: new Date('2020-09-20')
  }, {
    name: 'Jugendtreff (Süden)',
    date: new Date('2020-09-27')
  }, {
    name: 'Ende der Weihnachtsaktion',
    date: new Date('2020-12-12')
  }];

  constructor(
    private actionSheetController: ActionSheetController,
    private addToCalendarService: NgAddToCalendarService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  refresh(event: any) {
    event.target.complete();
  }

  async presentCalActionSheet(event: any) {
    const startDate: moment.Moment = moment(event.date).startOf('day');
    const endDate: moment.Moment = moment(event.date).endOf('day');
    const calEvent = {
      title: event.name,
      start: startDate.toDate(),
      duration: moment.duration((endDate).diff(startDate)).asMinutes(),
      end: endDate.toDate()
      // address: '1 test street, testland',
      // description: event.info
    };

    const actionSheet = await this.actionSheetController.create({
      header: 'Aktion wählen',
      buttons: [{
        text: 'Google Calendar Eintrag erstellen',
        handler: () => {
          const calUrl: any = this.sanitizer.bypassSecurityTrustUrl(
            this.addToCalendarService.getHrefFor(this.addToCalendarService.calendarType.google, calEvent)
          );

          window.open(calUrl.changingThisBreaksApplicationSecurity , '_blank');
        }
      }, {
        text: 'iCal Eintrag erstellen',
        handler: () => {
          const calUrl: any = this.sanitizer.bypassSecurityTrustUrl(
            this.addToCalendarService.getHrefFor(this.addToCalendarService.calendarType.iCalendar, calEvent)
          );

          const windowReference = window.open();

          windowReference.location = calUrl.changingThisBreaksApplicationSecurity;
        }
      }, {
        text: 'Abbrechen',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

}
