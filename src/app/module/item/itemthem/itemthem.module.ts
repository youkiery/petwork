import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemthemPageRoutingModule } from './itemthem-routing.module';

import { ItemthemPage } from './itemthem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemthemPageRoutingModule
  ],
  declarations: [ItemthemPage]
})
export class ItemthemPageModule {}
