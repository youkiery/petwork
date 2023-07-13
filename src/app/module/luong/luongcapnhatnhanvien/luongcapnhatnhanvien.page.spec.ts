import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LuongcapnhatnhanvienPage } from './luongcapnhatnhanvien.page';

describe('LuongcapnhatnhanvienPage', () => {
  let component: LuongcapnhatnhanvienPage;
  let fixture: ComponentFixture<LuongcapnhatnhanvienPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LuongcapnhatnhanvienPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LuongcapnhatnhanvienPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
