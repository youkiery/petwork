import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidestatisPageRoutingModule } from './ridestatis-routing.module';

import { RidestatisPage } from './ridestatis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidestatisPageRoutingModule
  ],
  declarations: [RidestatisPage]
})
export class RidestatisPageModule {}
