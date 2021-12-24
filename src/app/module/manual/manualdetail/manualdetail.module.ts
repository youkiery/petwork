import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualdetailPageRoutingModule } from './manualdetail-routing.module';

import { ManualdetailPage } from './manualdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualdetailPageRoutingModule
  ],
  declarations: [ManualdetailPage]
})
export class ManualdetailPageModule {}
