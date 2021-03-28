import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TextSizePage } from './text-size.page';

describe('TextSizePage', () => {
  let component: TextSizePage;
  let fixture: ComponentFixture<TextSizePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextSizePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TextSizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
