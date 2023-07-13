import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkdepartPageRoutingModule } from './workdepart-routing.module';

import { WorkdepartPage } from './workdepart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkdepartPageRoutingModule
  ],
  declarations: [WorkdepartPage]
})
export class WorkdepartPageModule {}
