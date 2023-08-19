import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatlichtonghopPageRoutingModule } from './datlichtonghop-routing.module';

import { DatlichtonghopPage } from './datlichtonghop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatlichtonghopPageRoutingModule
  ],
  declarations: [DatlichtonghopPage]
})
export class DatlichtonghopPageModule {}
