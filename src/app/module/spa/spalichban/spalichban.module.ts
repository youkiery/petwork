import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpalichbanPageRoutingModule } from './spalichban-routing.module';

import { SpalichbanPage } from './spalichban.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpalichbanPageRoutingModule
  ],
  declarations: [SpalichbanPage]
})
export class SpalichbanPageModule {}
