import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CauhinhnhantinPageRoutingModule } from './cauhinhnhantin-routing.module';

import { CauhinhnhantinPage } from './cauhinhnhantin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CauhinhnhantinPageRoutingModule
  ],
  declarations: [CauhinhnhantinPage]
})
export class CauhinhnhantinPageModule {}
