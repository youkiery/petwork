import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaccinedPageRoutingModule } from './vaccined-routing.module';

import { VaccinedPage } from './vaccined.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccinedPageRoutingModule
  ],
  declarations: [VaccinedPage]
})
export class VaccinedPageModule {}
