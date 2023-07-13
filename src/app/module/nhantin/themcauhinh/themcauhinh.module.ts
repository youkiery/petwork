import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThemcauhinhPageRoutingModule } from './themcauhinh-routing.module';

import { ThemcauhinhPage } from './themcauhinh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThemcauhinhPageRoutingModule
  ],
  declarations: [ThemcauhinhPage]
})
export class ThemcauhinhPageModule {}
