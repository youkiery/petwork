import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportinsertPageRoutingModule } from './transportinsert-routing.module';

import { TransportinsertPage } from './transportinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportinsertPageRoutingModule
  ],
  declarations: [TransportinsertPage]
})
export class TransportinsertPageModule {}
