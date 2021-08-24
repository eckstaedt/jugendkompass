import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImpulseListPage } from './impulse-list.page';

describe('ImpulseListPage', () => {
  let component: ImpulseListPage;
  let fixture: ComponentFixture<ImpulseListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpulseListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImpulseListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
