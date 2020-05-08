import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatesPage } from './dates.page';

describe('DatesPage', () => {
  let component: DatesPage;
  let fixture: ComponentFixture<DatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
