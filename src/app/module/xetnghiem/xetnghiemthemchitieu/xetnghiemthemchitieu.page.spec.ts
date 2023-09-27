import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { XetnghiemthemchitieuPage } from './xetnghiemthemchitieu.page';

describe('XetnghiemthemchitieuPage', () => {
  let component: XetnghiemthemchitieuPage;
  let fixture: ComponentFixture<XetnghiemthemchitieuPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XetnghiemthemchitieuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(XetnghiemthemchitieuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
