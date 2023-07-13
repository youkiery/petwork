import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemtransferPageRoutingModule } from './itemtransfer-routing.module';

import { ItemtransferPage } from './itemtransfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemtransferPageRoutingModule
  ],
  declarations: [ItemtransferPage]
})
export class ItemtransferPageModule {}
