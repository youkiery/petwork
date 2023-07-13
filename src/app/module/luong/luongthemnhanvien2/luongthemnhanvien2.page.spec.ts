import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Luongthemnhanvien2Page } from './luongthemnhanvien2.page';

describe('Luongthemnhanvien2Page', () => {
  let component: Luongthemnhanvien2Page;
  let fixture: ComponentFixture<Luongthemnhanvien2Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Luongthemnhanvien2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Luongthemnhanvien2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
