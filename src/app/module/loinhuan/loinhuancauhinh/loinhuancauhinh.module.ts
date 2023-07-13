import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoinhuancauhinhPageRoutingModule } from './loinhuancauhinh-routing.module';

import { LoinhuancauhinhPage } from './loinhuancauhinh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoinhuancauhinhPageRoutingModule
  ],
  declarations: [LoinhuancauhinhPage]
})
export class LoinhuancauhinhPageModule {}
