import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThietbiPageRoutingModule } from './thietbi-routing.module';

import { ThietbiPage } from './thietbi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThietbiPageRoutingModule
  ],
  declarations: [ThietbiPage]
})
export class ThietbiPageModule {}
