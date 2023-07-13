import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoinhuanthemcauhinhPage } from './loinhuanthemcauhinh.page';

describe('LoinhuanthemcauhinhPage', () => {
  let component: LoinhuanthemcauhinhPage;
  let fixture: ComponentFixture<LoinhuanthemcauhinhPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoinhuanthemcauhinhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoinhuanthemcauhinhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
