import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfinsertPageRoutingModule } from './profinsert-routing.module';

import { ProfinsertPage } from './profinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfinsertPageRoutingModule
  ],
  declarations: [ProfinsertPage]
})
export class ProfinsertPageModule {}
