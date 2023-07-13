import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaichinhthemPageRoutingModule } from './taichinhthem-routing.module';

import { TaichinhthemPage } from './taichinhthem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaichinhthemPageRoutingModule
  ],
  declarations: [TaichinhthemPage]
})
export class TaichinhthemPageModule {}
