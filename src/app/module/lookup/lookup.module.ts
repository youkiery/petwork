import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LookupPageRoutingModule } from './lookup-routing.module';

import { LookupPage } from './lookup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LookupPageRoutingModule
  ],
  declarations: [LookupPage]
})
export class LookupPageModule {}
