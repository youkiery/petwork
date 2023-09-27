import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { XetnghiemchitietPage } from './xetnghiemchitiet.page';

describe('XetnghiemchitietPage', () => {
  let component: XetnghiemchitietPage;
  let fixture: ComponentFixture<XetnghiemchitietPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XetnghiemchitietPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(XetnghiemchitietPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
