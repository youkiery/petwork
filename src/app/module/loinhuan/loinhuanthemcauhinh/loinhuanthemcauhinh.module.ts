import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoinhuanthemcauhinhPageRoutingModule } from './loinhuanthemcauhinh-routing.module';

import { LoinhuanthemcauhinhPage } from './loinhuanthemcauhinh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoinhuanthemcauhinhPageRoutingModule
  ],
  declarations: [LoinhuanthemcauhinhPage]
})
export class LoinhuanthemcauhinhPageModule {}
