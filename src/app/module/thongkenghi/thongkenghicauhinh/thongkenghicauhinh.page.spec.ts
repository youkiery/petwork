import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThongkenghicauhinhPage } from './thongkenghicauhinh.page';

describe('ThongkenghicauhinhPage', () => {
  let component: ThongkenghicauhinhPage;
  let fixture: ComponentFixture<ThongkenghicauhinhPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkenghicauhinhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThongkenghicauhinhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
