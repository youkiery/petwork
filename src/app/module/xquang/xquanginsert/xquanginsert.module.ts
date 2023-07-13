import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XquanginsertPageRoutingModule } from './xquanginsert-routing.module';

import { XquanginsertPage } from './xquanginsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XquanginsertPageRoutingModule
  ],
  declarations: [XquanginsertPage]
})
export class XquanginsertPageModule {}
