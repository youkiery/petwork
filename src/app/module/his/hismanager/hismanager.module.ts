import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HismanagerPageRoutingModule } from './hismanager-routing.module';

import { HismanagerPage } from './hismanager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HismanagerPageRoutingModule
  ],
  declarations: [HismanagerPage]
})
export class HismanagerPageModule {}
