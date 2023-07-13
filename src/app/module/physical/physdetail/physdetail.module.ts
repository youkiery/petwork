import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysdetailPageRoutingModule } from './physdetail-routing.module';

import { PhysdetailPage } from './physdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhysdetailPageRoutingModule
  ],
  declarations: [PhysdetailPage]
})
export class PhysdetailPageModule {}
