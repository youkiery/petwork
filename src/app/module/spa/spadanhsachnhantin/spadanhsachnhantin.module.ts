import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpadanhsachnhantinPageRoutingModule } from './spadanhsachnhantin-routing.module';

import { SpadanhsachnhantinPage } from './spadanhsachnhantin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpadanhsachnhantinPageRoutingModule
  ],
  declarations: [SpadanhsachnhantinPage]
})
export class SpadanhsachnhantinPageModule {}
