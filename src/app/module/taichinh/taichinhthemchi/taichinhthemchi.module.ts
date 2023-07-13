import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaichinhthemchiPageRoutingModule } from './taichinhthemchi-routing.module';

import { TaichinhthemchiPage } from './taichinhthemchi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaichinhthemchiPageRoutingModule
  ],
  declarations: [TaichinhthemchiPage]
})
export class TaichinhthemchiPageModule {}
