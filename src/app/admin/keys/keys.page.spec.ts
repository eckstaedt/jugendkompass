import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeysPage } from './keys.page';

describe('KeysPage', () => {
  let component: KeysPage;
  let fixture: ComponentFixture<KeysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeysPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
