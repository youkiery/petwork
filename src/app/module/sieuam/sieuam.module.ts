import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SieuamPageRoutingModule } from './sieuam-routing.module';

import { SieuamPage } from './sieuam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SieuamPageRoutingModule
  ],
  declarations: [SieuamPage]
})
export class SieuamPageModule {}
