import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongkenhantinPageRoutingModule } from './thongkenhantin-routing.module';

import { ThongkenhantinPage } from './thongkenhantin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongkenhantinPageRoutingModule
  ],
  declarations: [ThongkenhantinPage]
})
export class ThongkenhantinPageModule {}
