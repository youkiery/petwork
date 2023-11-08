import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TracnghiemketquaPage } from './tracnghiemketqua.page';

describe('TracnghiemketquaPage', () => {
  let component: TracnghiemketquaPage;
  let fixture: ComponentFixture<TracnghiemketquaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TracnghiemketquaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TracnghiemketquaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
