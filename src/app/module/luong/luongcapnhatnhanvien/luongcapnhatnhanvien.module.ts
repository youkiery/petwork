import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuongcapnhatnhanvienPageRoutingModule } from './luongcapnhatnhanvien-routing.module';

import { LuongcapnhatnhanvienPage } from './luongcapnhatnhanvien.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuongcapnhatnhanvienPageRoutingModule
  ],
  declarations: [LuongcapnhatnhanvienPage]
})
export class LuongcapnhatnhanvienPageModule {}
