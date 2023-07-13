import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpaschedulePageRoutingModule } from './spaschedule-routing.module';

import { SpaschedulePage } from './spaschedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpaschedulePageRoutingModule
  ],
  declarations: [SpaschedulePage]
})
export class SpaschedulePageModule {}
