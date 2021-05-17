import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AusgabePage } from './ausgabe.page';

describe('AusgabePage', () => {
  let component: AusgabePage;
  let fixture: ComponentFixture<AusgabePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AusgabePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AusgabePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
