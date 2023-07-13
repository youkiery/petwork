import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccselectPageRoutingModule } from './accselect-routing.module';

import { AccselectPage } from './accselect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccselectPageRoutingModule
  ],
  declarations: [AccselectPage]
})
export class AccselectPageModule {}
