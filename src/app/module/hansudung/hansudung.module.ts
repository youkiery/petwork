import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HansudungPageRoutingModule } from './hansudung-routing.module';

import { HansudungPage } from './hansudung.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HansudungPageRoutingModule
  ],
  declarations: [HansudungPage]
})
export class HansudungPageModule {}
