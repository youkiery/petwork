import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysinsertPageRoutingModule } from './physinsert-routing.module';

import { PhysinsertPage } from './physinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhysinsertPageRoutingModule
  ],
  declarations: [PhysinsertPage]
})
export class PhysinsertPageModule {}
