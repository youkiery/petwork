import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KaizeninsertPageRoutingModule } from './kaizeninsert-routing.module';

import { KaizeninsertPage } from './kaizeninsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KaizeninsertPageRoutingModule
  ],
  declarations: [KaizeninsertPage]
})
export class KaizeninsertPageModule {}
