import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TintucchuongtrinhPageRoutingModule } from './tintucchuongtrinh-routing.module';

import { TintucchuongtrinhPage } from './tintucchuongtrinh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TintucchuongtrinhPageRoutingModule
  ],
  declarations: [TintucchuongtrinhPage]
})
export class TintucchuongtrinhPageModule {}
