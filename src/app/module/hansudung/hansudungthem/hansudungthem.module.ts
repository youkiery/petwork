import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HansudungthemPageRoutingModule } from './hansudungthem-routing.module';

import { HansudungthemPage } from './hansudungthem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HansudungthemPageRoutingModule
  ],
  declarations: [HansudungthemPage]
})
export class HansudungthemPageModule {}
