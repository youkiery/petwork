import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuongmucchiPageRoutingModule } from './luongmucchi-routing.module';

import { LuongmucchiPage } from './luongmucchi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuongmucchiPageRoutingModule
  ],
  declarations: [LuongmucchiPage]
})
export class LuongmucchiPageModule {}
