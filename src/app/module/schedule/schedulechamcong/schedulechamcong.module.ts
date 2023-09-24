import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulechamcongPageRoutingModule } from './schedulechamcong-routing.module';

import { SchedulechamcongPage } from './schedulechamcong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulechamcongPageRoutingModule
  ],
  declarations: [SchedulechamcongPage]
})
export class SchedulechamcongPageModule {}
