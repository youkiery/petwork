import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulethongkePageRoutingModule } from './schedulethongke-routing.module';

import { SchedulethongkePage } from './schedulethongke.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulethongkePageRoutingModule
  ],
  declarations: [SchedulethongkePage]
})
export class SchedulethongkePageModule {}
