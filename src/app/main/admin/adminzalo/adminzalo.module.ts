import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminzaloPageRoutingModule } from './adminzalo-routing.module';

import { AdminzaloPage } from './adminzalo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminzaloPageRoutingModule
  ],
  declarations: [AdminzaloPage]
})
export class AdminzaloPageModule {}
