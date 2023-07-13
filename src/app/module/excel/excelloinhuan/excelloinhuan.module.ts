import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelloinhuanPageRoutingModule } from './excelloinhuan-routing.module';

import { ExcelloinhuanPage } from './excelloinhuan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelloinhuanPageRoutingModule
  ],
  declarations: [ExcelloinhuanPage]
})
export class ExcelloinhuanPageModule {}
