import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TindaguiPageRoutingModule } from './tindagui-routing.module';

import { TindaguiPage } from './tindagui.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TindaguiPageRoutingModule
  ],
  declarations: [TindaguiPage]
})
export class TindaguiPageModule {}
