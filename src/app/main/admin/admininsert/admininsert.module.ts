import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmininsertPageRoutingModule } from './admininsert-routing.module';

import { AdmininsertPage } from './admininsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmininsertPageRoutingModule
  ],
  declarations: [AdmininsertPage]
})
export class AdmininsertPageModule {}
