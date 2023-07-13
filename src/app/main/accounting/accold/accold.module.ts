import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccoldPageRoutingModule } from './accold-routing.module';

import { AccoldPage } from './accold.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccoldPageRoutingModule
  ],
  declarations: [AccoldPage]
})
export class AccoldPageModule {}
