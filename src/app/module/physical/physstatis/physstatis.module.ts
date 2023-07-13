import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysstatisPageRoutingModule } from './physstatis-routing.module';

import { PhysstatisPage } from './physstatis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhysstatisPageRoutingModule
  ],
  declarations: [PhysstatisPage]
})
export class PhysstatisPageModule {}
