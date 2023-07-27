import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatlichchuyenspaPage } from './datlichchuyenspa.page';

describe('DatlichchuyenspaPage', () => {
  let component: DatlichchuyenspaPage;
  let fixture: ComponentFixture<DatlichchuyenspaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatlichchuyenspaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatlichchuyenspaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
