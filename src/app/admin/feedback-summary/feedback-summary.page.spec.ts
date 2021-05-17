import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedbackSummaryPage } from './feedback-summary.page';

describe('FeedbackSummaryPage', () => {
  let component: FeedbackSummaryPage;
  let fixture: ComponentFixture<FeedbackSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackSummaryPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
