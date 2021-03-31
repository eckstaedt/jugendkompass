import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterModalPage } from './filter-modal.page';

describe('FilterModalPage', () => {
  let component: FilterModalPage;
  let fixture: ComponentFixture<FilterModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
