import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostListPage } from './post-list.page';

describe('PostListPage', () => {
  let component: PostListPage;
  let fixture: ComponentFixture<PostListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
