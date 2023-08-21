import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TintucthemPageRoutingModule } from './tintucthem-routing.module';

import { TintucthemPage } from './tintucthem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TintucthemPageRoutingModule
  ],
  declarations: [TintucthemPage]
})
export class TintucthemPageModule {}
