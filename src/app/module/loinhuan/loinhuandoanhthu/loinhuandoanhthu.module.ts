import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoinhuandoanhthuPageRoutingModule } from './loinhuandoanhthu-routing.module';

import { LoinhuandoanhthuPage } from './loinhuandoanhthu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoinhuandoanhthuPageRoutingModule
  ],
  declarations: [LoinhuandoanhthuPage]
})
export class LoinhuandoanhthuPageModule {}
