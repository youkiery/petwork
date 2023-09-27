import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemcanhbaoPageRoutingModule } from './itemcanhbao-routing.module';

import { ItemcanhbaoPage } from './itemcanhbao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemcanhbaoPageRoutingModule
  ],
  declarations: [ItemcanhbaoPage]
})
export class ItemcanhbaoPageModule {}
