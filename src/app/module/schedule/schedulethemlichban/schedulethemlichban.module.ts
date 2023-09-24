import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulethemlichbanPageRoutingModule } from './schedulethemlichban-routing.module';

import { SchedulethemlichbanPage } from './schedulethemlichban.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulethemlichbanPageRoutingModule
  ],
  declarations: [SchedulethemlichbanPage]
})
export class SchedulethemlichbanPageModule {}
