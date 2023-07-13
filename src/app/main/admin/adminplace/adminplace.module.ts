import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminplacePageRoutingModule } from './adminplace-routing.module';

import { AdminplacePage } from './adminplace.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminplacePageRoutingModule
  ],
  declarations: [AdminplacePage]
})
export class AdminplacePageModule {}
