import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkrepeatPageRoutingModule } from './workrepeat-routing.module';

import { WorkrepeatPage } from './workrepeat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkrepeatPageRoutingModule
  ],
  declarations: [WorkrepeatPage]
})
export class WorkrepeatPageModule {}
