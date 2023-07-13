import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuongchitietPageRoutingModule } from './luongchitiet-routing.module';

import { LuongchitietPage } from './luongchitiet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuongchitietPageRoutingModule
  ],
  declarations: [LuongchitietPage]
})
export class LuongchitietPageModule {}
