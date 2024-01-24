import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CauhinhkhachhangPage } from './cauhinhkhachhang.page';

describe('CauhinhkhachhangPage', () => {
  let component: CauhinhkhachhangPage;
  let fixture: ComponentFixture<CauhinhkhachhangPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CauhinhkhachhangPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CauhinhkhachhangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
