import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemcartPageRoutingModule } from './itemcart-routing.module';

import { ItemcartPage } from './itemcart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemcartPageRoutingModule
  ],
  declarations: [ItemcartPage]
})
export class ItemcartPageModule {}
