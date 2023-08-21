import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TintucPageRoutingModule } from './tintuc-routing.module';

import { TintucPage } from './tintuc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TintucPageRoutingModule
  ],
  declarations: [TintucPage]
})
export class TintucPageModule {}
