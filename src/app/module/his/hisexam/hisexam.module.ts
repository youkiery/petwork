import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisexamPageRoutingModule } from './hisexam-routing.module';

import { HisexamPage } from './hisexam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisexamPageRoutingModule
  ],
  declarations: [HisexamPage]
})
export class HisexamPageModule {}
