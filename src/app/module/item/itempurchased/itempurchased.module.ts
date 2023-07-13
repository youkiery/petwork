import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItempurchasedPageRoutingModule } from './itempurchased-routing.module';

import { ItempurchasedPage } from './itempurchased.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItempurchasedPageRoutingModule
  ],
  declarations: [ItempurchasedPage]
})
export class ItempurchasedPageModule {}
