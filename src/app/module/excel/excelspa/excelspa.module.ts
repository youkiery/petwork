import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelspaPageRoutingModule } from './excelspa-routing.module';

import { ExcelspaPage } from './excelspa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelspaPageRoutingModule
  ],
  declarations: [ExcelspaPage]
})
export class ExcelspaPageModule {}
