import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpanhantinPageRoutingModule } from './spanhantin-routing.module';

import { SpanhantinPage } from './spanhantin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpanhantinPageRoutingModule
  ],
  declarations: [SpanhantinPage]
})
export class SpanhantinPageModule {}
