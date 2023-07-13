import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuongPageRoutingModule } from './luong-routing.module';

import { LuongPage } from './luong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuongPageRoutingModule
  ],
  declarations: [LuongPage]
})
export class LuongPageModule {}
