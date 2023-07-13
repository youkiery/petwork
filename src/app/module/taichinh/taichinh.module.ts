import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaichinhPageRoutingModule } from './taichinh-routing.module';

import { TaichinhPage } from './taichinh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaichinhPageRoutingModule
  ],
  declarations: [TaichinhPage]
})
export class TaichinhPageModule {}
