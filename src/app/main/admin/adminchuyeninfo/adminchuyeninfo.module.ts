import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminchuyeninfoPageRoutingModule } from './adminchuyeninfo-routing.module';

import { AdminchuyeninfoPage } from './adminchuyeninfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminchuyeninfoPageRoutingModule
  ],
  declarations: [AdminchuyeninfoPage]
})
export class AdminchuyeninfoPageModule {}
