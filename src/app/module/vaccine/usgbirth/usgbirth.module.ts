import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsgbirthPageRoutingModule } from './usgbirth-routing.module';

import { UsgbirthPage } from './usgbirth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsgbirthPageRoutingModule
  ],
  declarations: [UsgbirthPage]
})
export class UsgbirthPageModule {}
