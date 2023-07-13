import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SieuaminsertPageRoutingModule } from './sieuaminsert-routing.module';

import { SieuaminsertPage } from './sieuaminsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SieuaminsertPageRoutingModule
  ],
  declarations: [SieuaminsertPage]
})
export class SieuaminsertPageModule {}
