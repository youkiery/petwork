import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoinhuandoanhthuPage } from './loinhuandoanhthu.page';

describe('LoinhuandoanhthuPage', () => {
  let component: LoinhuandoanhthuPage;
  let fixture: ComponentFixture<LoinhuandoanhthuPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoinhuandoanhthuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoinhuandoanhthuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
