import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LichbanPageRoutingModule } from './lichban-routing.module';

import { LichbanPage } from './lichban.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LichbanPageRoutingModule
  ],
  declarations: [LichbanPage]
})
export class LichbanPageModule {}
