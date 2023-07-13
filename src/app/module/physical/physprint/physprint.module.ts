import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysprintPageRoutingModule } from './physprint-routing.module';

import { PhysprintPage } from './physprint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhysprintPageRoutingModule
  ],
  declarations: [PhysprintPage]
})
export class PhysprintPageModule {}
