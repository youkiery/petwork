import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CauhinhnhantinPage } from './cauhinhnhantin.page';

describe('CauhinhnhantinPage', () => {
  let component: CauhinhnhantinPage;
  let fixture: ComponentFixture<CauhinhnhantinPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CauhinhnhantinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CauhinhnhantinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
