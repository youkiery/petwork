import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TailieuPageRoutingModule } from './tailieu-routing.module';

import { TailieuPage } from './tailieu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TailieuPageRoutingModule
  ],
  declarations: [TailieuPage]
})
export class TailieuPageModule {}
