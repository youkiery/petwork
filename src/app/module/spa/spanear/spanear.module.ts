import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpanearPageRoutingModule } from './spanear-routing.module';

import { SpanearPage } from './spanear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpanearPageRoutingModule
  ],
  declarations: [SpanearPage]
})
export class SpanearPageModule {}
