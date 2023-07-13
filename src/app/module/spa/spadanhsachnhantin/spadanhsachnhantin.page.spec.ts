import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpadanhsachnhantinPage } from './spadanhsachnhantin.page';

describe('SpadanhsachnhantinPage', () => {
  let component: SpadanhsachnhantinPage;
  let fixture: ComponentFixture<SpadanhsachnhantinPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpadanhsachnhantinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpadanhsachnhantinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
