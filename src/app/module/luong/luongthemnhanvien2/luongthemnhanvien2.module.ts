import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Luongthemnhanvien2PageRoutingModule } from './luongthemnhanvien2-routing.module';

import { Luongthemnhanvien2Page } from './luongthemnhanvien2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Luongthemnhanvien2PageRoutingModule
  ],
  declarations: [Luongthemnhanvien2Page]
})
export class Luongthemnhanvien2PageModule {}
