import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaichinhimportPageRoutingModule } from './taichinhimport-routing.module';

import { TaichinhimportPage } from './taichinhimport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaichinhimportPageRoutingModule
  ],
  declarations: [TaichinhimportPage]
})
export class TaichinhimportPageModule {}
