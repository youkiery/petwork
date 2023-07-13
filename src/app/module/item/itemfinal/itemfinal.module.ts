import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemfinalPageRoutingModule } from './itemfinal-routing.module';

import { ItemfinalPage } from './itemfinal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemfinalPageRoutingModule
  ],
  declarations: [ItemfinalPage]
})
export class ItemfinalPageModule {}
