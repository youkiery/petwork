import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaichinhnonccPageRoutingModule } from './taichinhnoncc-routing.module';

import { TaichinhnonccPage } from './taichinhnoncc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaichinhnonccPageRoutingModule
  ],
  declarations: [TaichinhnonccPage]
})
export class TaichinhnonccPageModule {}
