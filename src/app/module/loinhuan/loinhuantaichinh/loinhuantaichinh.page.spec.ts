import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoinhuantaichinhPage } from './loinhuantaichinh.page';

describe('LoinhuantaichinhPage', () => {
  let component: LoinhuantaichinhPage;
  let fixture: ComponentFixture<LoinhuantaichinhPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoinhuantaichinhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoinhuantaichinhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
