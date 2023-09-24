import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulelichbanPageRoutingModule } from './schedulelichban-routing.module';

import { SchedulelichbanPage } from './schedulelichban.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulelichbanPageRoutingModule
  ],
  declarations: [SchedulelichbanPage]
})
export class SchedulelichbanPageModule {}
