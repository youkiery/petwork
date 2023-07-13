import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OthertypePageRoutingModule } from './othertype-routing.module';

import { OthertypePage } from './othertype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OthertypePageRoutingModule
  ],
  declarations: [OthertypePage]
})
export class OthertypePageModule {}
