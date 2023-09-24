import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchedulecauhinhchamcongPage } from './schedulecauhinhchamcong.page';

describe('SchedulecauhinhchamcongPage', () => {
  let component: SchedulecauhinhchamcongPage;
  let fixture: ComponentFixture<SchedulecauhinhchamcongPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulecauhinhchamcongPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulecauhinhchamcongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
