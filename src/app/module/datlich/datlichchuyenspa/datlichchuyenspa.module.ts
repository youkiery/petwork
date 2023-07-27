import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatlichchuyenspaPageRoutingModule } from './datlichchuyenspa-routing.module';

import { DatlichchuyenspaPage } from './datlichchuyenspa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatlichchuyenspaPageRoutingModule
  ],
  declarations: [DatlichchuyenspaPage]
})
export class DatlichchuyenspaPageModule {}
