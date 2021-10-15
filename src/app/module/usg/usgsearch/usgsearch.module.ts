import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsgsearchPageRoutingModule } from './usgsearch-routing.module';

import { UsgsearchPage } from './usgsearch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsgsearchPageRoutingModule
  ],
  declarations: [UsgsearchPage]
})
export class UsgsearchPageModule {}
