import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoinhuanPageRoutingModule } from './loinhuan-routing.module';

import { LoinhuanPage } from './loinhuan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoinhuanPageRoutingModule
  ],
  declarations: [LoinhuanPage]
})
export class LoinhuanPageModule {}
