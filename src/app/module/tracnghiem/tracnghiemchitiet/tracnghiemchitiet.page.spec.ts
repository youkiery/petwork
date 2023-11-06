import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TracnghiemchitietPage } from './tracnghiemchitiet.page';

describe('TracnghiemchitietPage', () => {
  let component: TracnghiemchitietPage;
  let fixture: ComponentFixture<TracnghiemchitietPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TracnghiemchitietPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TracnghiemchitietPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
