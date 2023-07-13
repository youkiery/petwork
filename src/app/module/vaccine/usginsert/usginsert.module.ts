import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsginsertPageRoutingModule } from './usginsert-routing.module';

import { UsginsertPage } from './usginsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsginsertPageRoutingModule
  ],
  declarations: [UsginsertPage]
})
export class UsginsertPageModule {}
