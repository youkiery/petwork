import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpainsertPageRoutingModule } from './spainsert-routing.module';

import { SpainsertPage } from './spainsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpainsertPageRoutingModule
  ],
  declarations: [SpainsertPage]
})
export class SpainsertPageModule {}
