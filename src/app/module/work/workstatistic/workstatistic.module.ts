import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkstatisticPageRoutingModule } from './workstatistic-routing.module';

import { WorkstatisticPage } from './workstatistic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkstatisticPageRoutingModule
  ],
  declarations: [WorkstatisticPage]
})
export class WorkstatisticPageModule {}
