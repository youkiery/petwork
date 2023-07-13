import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpaworkPageRoutingModule } from './spawork-routing.module';

import { SpaworkPage } from './spawork.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpaworkPageRoutingModule
  ],
  declarations: [SpaworkPage]
})
export class SpaworkPageModule {}
