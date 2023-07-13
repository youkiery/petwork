import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoinhuantaichinhPageRoutingModule } from './loinhuantaichinh-routing.module';

import { LoinhuantaichinhPage } from './loinhuantaichinh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoinhuantaichinhPageRoutingModule
  ],
  declarations: [LoinhuantaichinhPage]
})
export class LoinhuantaichinhPageModule {}
