import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TailieuthemPageRoutingModule } from './tailieuthem-routing.module';

import { TailieuthemPage } from './tailieuthem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TailieuthemPageRoutingModule
  ],
  declarations: [TailieuthemPage]
})
export class TailieuthemPageModule {}
