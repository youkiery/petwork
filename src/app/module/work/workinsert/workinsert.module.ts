import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkinsertPageRoutingModule } from './workinsert-routing.module';

import { WorkinsertPage } from './workinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkinsertPageRoutingModule
  ],
  declarations: [WorkinsertPage]
})
export class WorkinsertPageModule {}
