import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KhachhangthemchinhanhPage } from './khachhangthemchinhanh.page';

describe('KhachhangthemchinhanhPage', () => {
  let component: KhachhangthemchinhanhPage;
  let fixture: ComponentFixture<KhachhangthemchinhanhPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KhachhangthemchinhanhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KhachhangthemchinhanhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
