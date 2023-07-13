import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuongnamPageRoutingModule } from './luongnam-routing.module';

import { LuongnamPage } from './luongnam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuongnamPageRoutingModule
  ],
  declarations: [LuongnamPage]
})
export class LuongnamPageModule {}
