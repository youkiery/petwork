import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaccinesearchPageRoutingModule } from './vaccinesearch-routing.module';

import { VaccinesearchPage } from './vaccinesearch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccinesearchPageRoutingModule
  ],
  declarations: [VaccinesearchPage]
})
export class VaccinesearchPageModule {}
