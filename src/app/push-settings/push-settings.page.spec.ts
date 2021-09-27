import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PushSettingsPage } from './push-settings.page';

describe('PushSettingsPage', () => {
  let component: PushSettingsPage;
  let fixture: ComponentFixture<PushSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushSettingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PushSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
