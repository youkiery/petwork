import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItempurchaseinsertPage } from './itempurchaseinsert.page';

describe('ItempurchaseinsertPage', () => {
  let component: ItempurchaseinsertPage;
  let fixture: ComponentFixture<ItempurchaseinsertPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItempurchaseinsertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItempurchaseinsertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
