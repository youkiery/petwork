import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemfilePageRoutingModule } from './itemfile-routing.module';

import { ItemfilePage } from './itemfile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemfilePageRoutingModule
  ],
  declarations: [ItemfilePage]
})
export class ItemfilePageModule {}
