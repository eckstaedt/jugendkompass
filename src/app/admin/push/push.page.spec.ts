import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PushPage } from './push.page';

describe('PushPage', () => {
  let component: PushPage;
  let fixture: ComponentFixture<PushPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PushPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
