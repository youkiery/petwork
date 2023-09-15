import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KhachhanghenngayPage } from './khachhanghenngay.page';

describe('KhachhanghenngayPage', () => {
  let component: KhachhanghenngayPage;
  let fixture: ComponentFixture<KhachhanghenngayPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhachhanghenngayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KhachhanghenngayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
