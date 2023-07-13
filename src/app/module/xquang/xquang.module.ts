import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XquangPageRoutingModule } from './xquang-routing.module';

import { XquangPage } from './xquang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XquangPageRoutingModule
  ],
  declarations: [XquangPage]
})
export class XquangPageModule {}
