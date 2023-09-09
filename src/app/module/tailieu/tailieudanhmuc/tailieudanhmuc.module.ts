import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TailieudanhmucPageRoutingModule } from './tailieudanhmuc-routing.module';

import { TailieudanhmucPage } from './tailieudanhmuc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TailieudanhmucPageRoutingModule
  ],
  declarations: [TailieudanhmucPage]
})
export class TailieudanhmucPageModule {}
