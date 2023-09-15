import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KhachhangchuyenmonPage } from './khachhangchuyenmon.page';

describe('KhachhangchuyenmonPage', () => {
  let component: KhachhangchuyenmonPage;
  let fixture: ComponentFixture<KhachhangchuyenmonPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhachhangchuyenmonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KhachhangchuyenmonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
