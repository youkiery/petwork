import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulecauhinhchamcongPageRoutingModule } from './schedulecauhinhchamcong-routing.module';

import { SchedulecauhinhchamcongPage } from './schedulecauhinhchamcong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulecauhinhchamcongPageRoutingModule
  ],
  declarations: [SchedulecauhinhchamcongPage]
})
export class SchedulecauhinhchamcongPageModule {}
