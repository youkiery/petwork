import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistempPageRoutingModule } from './histemp-routing.module';

import { HistempPage } from './histemp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistempPageRoutingModule
  ],
  declarations: [HistempPage]
})
export class HistempPageModule {}
