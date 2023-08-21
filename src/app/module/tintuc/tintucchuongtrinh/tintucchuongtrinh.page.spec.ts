import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TintucchuongtrinhPage } from './tintucchuongtrinh.page';

describe('TintucchuongtrinhPage', () => {
  let component: TintucchuongtrinhPage;
  let fixture: ComponentFixture<TintucchuongtrinhPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TintucchuongtrinhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TintucchuongtrinhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
