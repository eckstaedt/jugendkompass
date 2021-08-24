import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImpulsePage } from './impulse.page';

describe('ImpulsePage', () => {
  let component: ImpulsePage;
  let fixture: ComponentFixture<ImpulsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpulsePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImpulsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
