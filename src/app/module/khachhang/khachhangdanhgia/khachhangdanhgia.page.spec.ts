import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KhachhangdanhgiaPage } from './khachhangdanhgia.page';

describe('KhachhangdanhgiaPage', () => {
  let component: KhachhangdanhgiaPage;
  let fixture: ComponentFixture<KhachhangdanhgiaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhachhangdanhgiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KhachhangdanhgiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
