import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExcelsualoinhuanPage } from './excelsualoinhuan.page';

describe('ExcelsualoinhuanPage', () => {
  let component: ExcelsualoinhuanPage;
  let fixture: ComponentFixture<ExcelsualoinhuanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelsualoinhuanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExcelsualoinhuanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
