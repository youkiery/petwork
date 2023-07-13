import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LuongtimnhanvienPage } from './luongtimnhanvien.page';

describe('LuongtimnhanvienPage', () => {
  let component: LuongtimnhanvienPage;
  let fixture: ComponentFixture<LuongtimnhanvienPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LuongtimnhanvienPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LuongtimnhanvienPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
