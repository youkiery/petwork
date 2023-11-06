import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TracnghiemcapnhatPage } from './tracnghiemcapnhat.page';

describe('TracnghiemcapnhatPage', () => {
  let component: TracnghiemcapnhatPage;
  let fixture: ComponentFixture<TracnghiemcapnhatPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TracnghiemcapnhatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TracnghiemcapnhatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
