import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsgmanagerPageRoutingModule } from './usgmanager-routing.module';

import { UsgmanagerPage } from './usgmanager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsgmanagerPageRoutingModule
  ],
  declarations: [UsgmanagerPage]
})
export class UsgmanagerPageModule {}
