import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuongnhaptayPageRoutingModule } from './luongnhaptay-routing.module';

import { LuongnhaptayPage } from './luongnhaptay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuongnhaptayPageRoutingModule
  ],
  declarations: [LuongnhaptayPage]
})
export class LuongnhaptayPageModule {}
