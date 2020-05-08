import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataprotPage } from './dataprot.page';

describe('DataprotPage', () => {
  let component: DataprotPage;
  let fixture: ComponentFixture<DataprotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataprotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataprotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
