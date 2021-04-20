import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnswersModalPage } from './answers-modal.page';

describe('AnswersModalPage', () => {
  let component: AnswersModalPage;
  let fixture: ComponentFixture<AnswersModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswersModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnswersModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
