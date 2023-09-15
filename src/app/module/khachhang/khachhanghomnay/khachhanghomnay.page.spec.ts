import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KhachhanghomnayPage } from './khachhanghomnay.page';

describe('KhachhanghomnayPage', () => {
  let component: KhachhanghomnayPage;
  let fixture: ComponentFixture<KhachhanghomnayPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhachhanghomnayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KhachhanghomnayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
