import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HisxemchitietdieutriPage } from './hisxemchitietdieutri.page';

describe('HisxemchitietdieutriPage', () => {
  let component: HisxemchitietdieutriPage;
  let fixture: ComponentFixture<HisxemchitietdieutriPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HisxemchitietdieutriPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HisxemchitietdieutriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
