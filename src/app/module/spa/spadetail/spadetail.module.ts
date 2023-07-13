import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpadetailPageRoutingModule } from './spadetail-routing.module';

import { SpadetailPage } from './spadetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpadetailPageRoutingModule
  ],
  declarations: [SpadetailPage]
})
export class SpadetailPageModule {}
