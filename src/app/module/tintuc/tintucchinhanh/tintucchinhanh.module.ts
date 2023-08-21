import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TintucchinhanhPageRoutingModule } from './tintucchinhanh-routing.module';

import { TintucchinhanhPage } from './tintucchinhanh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TintucchinhanhPageRoutingModule
  ],
  declarations: [TintucchinhanhPage]
})
export class TintucchinhanhPageModule {}
