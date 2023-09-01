import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemthanhphanPageRoutingModule } from './itemthanhphan-routing.module';

import { ItemthanhphanPage } from './itemthanhphan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemthanhphanPageRoutingModule
  ],
  declarations: [ItemthanhphanPage]
})
export class ItemthanhphanPageModule {}
