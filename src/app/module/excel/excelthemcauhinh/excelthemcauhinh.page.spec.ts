import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExcelthemcauhinhPage } from './excelthemcauhinh.page';

describe('ExcelthemcauhinhPage', () => {
  let component: ExcelthemcauhinhPage;
  let fixture: ComponentFixture<ExcelthemcauhinhPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelthemcauhinhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExcelthemcauhinhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
