import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsourcePageRoutingModule } from './itemsource-routing.module';

import { ItemsourcePage } from './itemsource.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsourcePageRoutingModule
  ],
  declarations: [ItemsourcePage]
})
export class ItemsourcePageModule {}
