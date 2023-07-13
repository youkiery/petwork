import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThemthietbiPageRoutingModule } from './themthietbi-routing.module';

import { ThemthietbiPage } from './themthietbi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThemthietbiPageRoutingModule
  ],
  declarations: [ThemthietbiPage]
})
export class ThemthietbiPageModule {}
