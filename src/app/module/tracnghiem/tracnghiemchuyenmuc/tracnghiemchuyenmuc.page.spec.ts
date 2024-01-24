import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TracnghiemchuyenmucPage } from './tracnghiemchuyenmuc.page';

describe('TracnghiemchuyenmucPage', () => {
  let component: TracnghiemchuyenmucPage;
  let fixture: ComponentFixture<TracnghiemchuyenmucPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TracnghiemchuyenmucPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TracnghiemchuyenmucPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
