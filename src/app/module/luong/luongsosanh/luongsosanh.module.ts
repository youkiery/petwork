import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuongsosanhPageRoutingModule } from './luongsosanh-routing.module';

import { LuongsosanhPage } from './luongsosanh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuongsosanhPageRoutingModule
  ],
  declarations: [LuongsosanhPage]
})
export class LuongsosanhPageModule {}
