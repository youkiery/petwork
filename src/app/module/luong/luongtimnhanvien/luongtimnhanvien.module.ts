import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuongtimnhanvienPageRoutingModule } from './luongtimnhanvien-routing.module';

import { LuongtimnhanvienPage } from './luongtimnhanvien.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuongtimnhanvienPageRoutingModule
  ],
  declarations: [LuongtimnhanvienPage]
})
export class LuongtimnhanvienPageModule {}
