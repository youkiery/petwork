import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuongthangPageRoutingModule } from './luongthang-routing.module';

import { LuongthangPage } from './luongthang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuongthangPageRoutingModule
  ],
  declarations: [LuongthangPage]
})
export class LuongthangPageModule {}
