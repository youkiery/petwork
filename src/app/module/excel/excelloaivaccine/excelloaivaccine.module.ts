import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelloaivaccinePageRoutingModule } from './excelloaivaccine-routing.module';

import { ExcelloaivaccinePage } from './excelloaivaccine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelloaivaccinePageRoutingModule
  ],
  declarations: [ExcelloaivaccinePage]
})
export class ExcelloaivaccinePageModule {}
