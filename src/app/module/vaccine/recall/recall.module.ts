import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecallPageRoutingModule } from './recall-routing.module';

import { RecallPage } from './recall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecallPageRoutingModule
  ],
  declarations: [RecallPage]
})
export class RecallPageModule {}
