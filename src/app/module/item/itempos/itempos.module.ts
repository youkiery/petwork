import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemposPageRoutingModule } from './itempos-routing.module';

import { ItemposPage } from './itempos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemposPageRoutingModule
  ],
  declarations: [ItemposPage]
})
export class ItemposPageModule {}
