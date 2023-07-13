import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkinsertfollowPageRoutingModule } from './workinsertfollow-routing.module';

import { WorkinsertfollowPage } from './workinsertfollow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkinsertfollowPageRoutingModule
  ],
  declarations: [WorkinsertfollowPage]
})
export class WorkinsertfollowPageModule {}
