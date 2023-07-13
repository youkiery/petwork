import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExceldangkylichPageRoutingModule } from './exceldangkylich-routing.module';

import { ExceldangkylichPage } from './exceldangkylich.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExceldangkylichPageRoutingModule
  ],
  declarations: [ExceldangkylichPage]
})
export class ExceldangkylichPageModule {}
