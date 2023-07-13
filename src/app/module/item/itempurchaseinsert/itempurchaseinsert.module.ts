import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItempurchaseinsertPageRoutingModule } from './itempurchaseinsert-routing.module';

import { ItempurchaseinsertPage } from './itempurchaseinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItempurchaseinsertPageRoutingModule
  ],
  declarations: [ItempurchaseinsertPage]
})
export class ItempurchaseinsertPageModule {}
