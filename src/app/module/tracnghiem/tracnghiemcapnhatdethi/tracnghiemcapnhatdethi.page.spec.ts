import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TracnghiemcapnhatdethiPage } from './tracnghiemcapnhatdethi.page';

describe('TracnghiemcapnhatdethiPage', () => {
  let component: TracnghiemcapnhatdethiPage;
  let fixture: ComponentFixture<TracnghiemcapnhatdethiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TracnghiemcapnhatdethiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TracnghiemcapnhatdethiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
