import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuongthemnhanvienPageRoutingModule } from './luongthemnhanvien-routing.module';

import { LuongthemnhanvienPage } from './luongthemnhanvien.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuongthemnhanvienPageRoutingModule
  ],
  declarations: [LuongthemnhanvienPage]
})
export class LuongthemnhanvienPageModule {}
