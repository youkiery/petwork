import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TailieudanhmucPage } from './tailieudanhmuc.page';

describe('TailieudanhmucPage', () => {
  let component: TailieudanhmucPage;
  let fixture: ComponentFixture<TailieudanhmucPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TailieudanhmucPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TailieudanhmucPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
