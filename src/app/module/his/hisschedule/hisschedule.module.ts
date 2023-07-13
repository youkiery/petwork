import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisschedulePageRoutingModule } from './hisschedule-routing.module';

import { HisschedulePage } from './hisschedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisschedulePageRoutingModule
  ],
  declarations: [HisschedulePage]
})
export class HisschedulePageModule {}
