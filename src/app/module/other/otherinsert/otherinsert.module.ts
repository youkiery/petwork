import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherinsertPageRoutingModule } from './otherinsert-routing.module';

import { OtherinsertPage } from './otherinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherinsertPageRoutingModule
  ],
  declarations: [OtherinsertPage]
})
export class OtherinsertPageModule {}
