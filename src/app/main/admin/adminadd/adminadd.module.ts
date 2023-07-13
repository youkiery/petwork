import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminaddPageRoutingModule } from './adminadd-routing.module';

import { AdminaddPage } from './adminadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminaddPageRoutingModule
  ],
  declarations: [AdminaddPage]
})
export class AdminaddPageModule {}
