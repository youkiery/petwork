import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisimagesPageRoutingModule } from './hisimages-routing.module';

import { HisimagesPage } from './hisimages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisimagesPageRoutingModule
  ],
  declarations: [HisimagesPage]
})
export class HisimagesPageModule {}
