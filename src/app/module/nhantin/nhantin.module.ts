import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NhantinPageRoutingModule } from './nhantin-routing.module';

import { NhantinPage } from './nhantin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NhantinPageRoutingModule
  ],
  declarations: [NhantinPage]
})
export class NhantinPageModule {}
