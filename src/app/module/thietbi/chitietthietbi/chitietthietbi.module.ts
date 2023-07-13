import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChitietthietbiPageRoutingModule } from './chitietthietbi-routing.module';

import { ChitietthietbiPage } from './chitietthietbi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChitietthietbiPageRoutingModule
  ],
  declarations: [ChitietthietbiPage]
})
export class ChitietthietbiPageModule {}
