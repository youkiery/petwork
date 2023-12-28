import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpathemlichbanPageRoutingModule } from './spathemlichban-routing.module';

import { SpathemlichbanPage } from './spathemlichban.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpathemlichbanPageRoutingModule
  ],
  declarations: [SpathemlichbanPage]
})
export class SpathemlichbanPageModule {}
