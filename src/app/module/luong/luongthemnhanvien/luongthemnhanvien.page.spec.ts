import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LuongthemnhanvienPage } from './luongthemnhanvien.page';

describe('LuongthemnhanvienPage', () => {
  let component: LuongthemnhanvienPage;
  let fixture: ComponentFixture<LuongthemnhanvienPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LuongthemnhanvienPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LuongthemnhanvienPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
