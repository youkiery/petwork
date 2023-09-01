import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemimportPageRoutingModule } from './itemimport-routing.module';

import { ItemimportPage } from './itemimport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemimportPageRoutingModule
  ],
  declarations: [ItemimportPage]
})
export class ItemimportPageModule {}
