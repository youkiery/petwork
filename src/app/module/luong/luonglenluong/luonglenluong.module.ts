import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuonglenluongPageRoutingModule } from './luonglenluong-routing.module';

import { LuonglenluongPage } from './luonglenluong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuonglenluongPageRoutingModule
  ],
  declarations: [LuonglenluongPage]
})
export class LuonglenluongPageModule {}
