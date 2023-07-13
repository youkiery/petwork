import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoinhuancauhinhPage } from './loinhuancauhinh.page';

describe('LoinhuancauhinhPage', () => {
  let component: LoinhuancauhinhPage;
  let fixture: ComponentFixture<LoinhuancauhinhPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoinhuancauhinhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoinhuancauhinhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
