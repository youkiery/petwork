import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkdepartinsertPageRoutingModule } from './workdepartinsert-routing.module';

import { WorkdepartinsertPage } from './workdepartinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkdepartinsertPageRoutingModule
  ],
  declarations: [WorkdepartinsertPage]
})
export class WorkdepartinsertPageModule {}
