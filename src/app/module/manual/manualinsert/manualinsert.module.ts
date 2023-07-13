import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualinsertPageRoutingModule } from './manualinsert-routing.module';

import { ManualinsertPage } from './manualinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualinsertPageRoutingModule
  ],
  declarations: [ManualinsertPage]
})
export class ManualinsertPageModule {}
