import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { XetnghiemthemgiongPage } from './xetnghiemthemgiong.page';

describe('XetnghiemthemgiongPage', () => {
  let component: XetnghiemthemgiongPage;
  let fixture: ComponentFixture<XetnghiemthemgiongPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XetnghiemthemgiongPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(XetnghiemthemgiongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
