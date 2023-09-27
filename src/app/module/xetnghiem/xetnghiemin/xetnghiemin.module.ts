import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XetnghieminPageRoutingModule } from './xetnghiemin-routing.module';

import { XetnghieminPage } from './xetnghiemin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XetnghieminPageRoutingModule
  ],
  declarations: [XetnghieminPage]
})
export class XetnghieminPageModule {}
