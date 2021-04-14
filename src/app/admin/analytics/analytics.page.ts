import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as dayjs from 'dayjs'
import { Chart } from 'chart.js';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AnalyticsField, Platforms } from 'src/app/utils/constants';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {
  @ViewChild("sessionsChart") sessionsChart: ElementRef;
  @ViewChild("platformChart") platformChart: ElementRef;

  data;
  sessionsCount: number = 0;
  adminCount: number = 0;
  passwordSuccesCount: number = 0;
  passwordFailureCount: number = 0;
  categoryChangedCount: number = 0;
  videoPlayedCount: number = 0;
  pdfDownloadedCount: number = 0;
  ausgabeOpenedCount: number = 0;
  filterAppliedCount: number = 0;
  favoriteAddedCount: number = 0;
  favoriteRemovedCount: number = 0;

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.firebaseService.getAnalyticsOverview().subscribe((data: any) => {
      this.data = data;
      if (data[`${AnalyticsField.APP_SESSIONS}Count`]) {
        this.sessionsCount = data[`${AnalyticsField.APP_SESSIONS}Count`];
        if (data[`${AnalyticsField.APP_SESSIONS}Count`] > 1) {
          this.prepareSessionsChart(data[`${AnalyticsField.APP_SESSIONS}Data`]);
        }
      }
      if (data[`${AnalyticsField.ADMIN_LOGGED_IN}Count`]) {
        this.adminCount = data[`${AnalyticsField.ADMIN_LOGGED_IN}Count`];
      }
      if (data[`${AnalyticsField.CORRECT_PASSWORD_PROVIDED}Count`]) {
        this.passwordSuccesCount = data[`${AnalyticsField.CORRECT_PASSWORD_PROVIDED}Count`];
      }
      if (data[`${AnalyticsField.INVALID_PASSWORD_PROVIDED}Count`]) {
        this.passwordFailureCount = data[`${AnalyticsField.INVALID_PASSWORD_PROVIDED}Count`];
      }
      if (data[`${AnalyticsField.CATEGORY_CHANGED}Count`]) {
        this.categoryChangedCount = data[`${AnalyticsField.CATEGORY_CHANGED}Count`];
      }
      if (data[`${AnalyticsField.VIDEO_PLAYED}Count`]) {
        this.videoPlayedCount = data[`${AnalyticsField.VIDEO_PLAYED}Count`];
      }
      if (data[`${AnalyticsField.PDF_DOWNLOADED}Count`]) {
        this.pdfDownloadedCount = data[`${AnalyticsField.PDF_DOWNLOADED}Count`];
      }
      if (data[`${AnalyticsField.AUSGABE_OPENED}Count`]) {
        this.ausgabeOpenedCount = data[`${AnalyticsField.AUSGABE_OPENED}Count`];
      }
      if (data[`${AnalyticsField.FILTER_MODAL_APPLIED}Count`]) {
        this.filterAppliedCount = data[`${AnalyticsField.FILTER_MODAL_APPLIED}Count`];
      }
      if (data[`${AnalyticsField.FAVORITE_ADDED}Count`]) {
        this.favoriteAddedCount = data[`${AnalyticsField.FAVORITE_ADDED}Count`];
      }
      if (data[`${AnalyticsField.FAVORITE_REMOVED}Count`]) {
        this.favoriteRemovedCount = data[`${AnalyticsField.FAVORITE_REMOVED}Count`];
      }
    });
  }

  prepareSessionsChart(data: { timestamp: firebase.firestore.Timestamp, platform: Platforms }[]) {
    const days: any[] = [];
    const platforms: any = {
      [Platforms.IPHONE]: 0,
      [Platforms.IPAD]: 0,
      [Platforms.ANDROID_PHONE]: 0,
      [Platforms.ANDROID_TABLET]: 0,
      [Platforms.WEB]: 0,
      [Platforms.OTHER]: 0,
    };
    for (const entry of data) {
      const date: dayjs.Dayjs = dayjs(entry.timestamp.toDate());
      const index: number = days.findIndex((d: any) => date.isSame(d.date, 'day'));
      if (index > -1) {
        days[index] = {
          ...days[index],
          count: days[index].count + 1
        }
      } else {
        days.push({
          name: date.format('DD.MM.YYYY'),
          date: date,
          count: 1
        });
      }

      platforms[entry.platform] += 1;
    }
    new Chart(this.sessionsChart.nativeElement, {
      type: 'bar',
      data: {
        labels: days.map((d: any) => d.name),
        datasets: [{
          label: 'Sessions',
          data: days.map((d: any) => d.count),
          backgroundColor: [
            '#d5303f'
          ],
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    new Chart(this.platformChart.nativeElement, {
      type: 'pie',
      data: {
        labels: Object.keys(platforms),
        datasets: [{
          data: Object.keys(platforms).map((key) => platforms[key]),
          backgroundColor: [
            '#d5303f',
            '#3dc2ff',
            '#5260ff',
            '#2dd36f',
            '#ffc409',
            '#222428',
            '#92949c'
          ],
        }]
      }
    });
  }

  onChartClick(event) {
    console.log(event);
  }

}
