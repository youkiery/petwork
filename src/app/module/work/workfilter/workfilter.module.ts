import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkfilterPageRoutingModule } from './workfilter-routing.module';

import { WorkfilterPage } from './workfilter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkfilterPageRoutingModule
  ],
  declarations: [WorkfilterPage]
})
export class WorkfilterPageModule {}
