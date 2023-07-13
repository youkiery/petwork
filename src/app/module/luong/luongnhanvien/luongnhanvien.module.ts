import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuongnhanvienPageRoutingModule } from './luongnhanvien-routing.module';

import { LuongnhanvienPage } from './luongnhanvien.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuongnhanvienPageRoutingModule
  ],
  declarations: [LuongnhanvienPage]
})
export class LuongnhanvienPageModule {}
