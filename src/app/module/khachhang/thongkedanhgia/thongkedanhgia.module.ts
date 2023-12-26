import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongkedanhgiaPageRoutingModule } from './thongkedanhgia-routing.module';

import { ThongkedanhgiaPage } from './thongkedanhgia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongkedanhgiaPageRoutingModule
  ],
  declarations: [ThongkedanhgiaPage]
})
export class ThongkedanhgiaPageModule {}
