import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemmanagerPageRoutingModule } from './itemmanager-routing.module';

import { ItemmanagerPage } from './itemmanager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemmanagerPageRoutingModule
  ],
  declarations: [ItemmanagerPage]
})
export class ItemmanagerPageModule {}
