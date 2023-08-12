import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongkenghicauhinhPageRoutingModule } from './thongkenghicauhinh-routing.module';

import { ThongkenghicauhinhPage } from './thongkenghicauhinh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongkenghicauhinhPageRoutingModule
  ],
  declarations: [ThongkenghicauhinhPage]
})
export class ThongkenghicauhinhPageModule {}
