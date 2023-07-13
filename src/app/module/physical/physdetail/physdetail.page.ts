import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-physdetail',
  templateUrl: './physdetail.page.html',
  styleUrls: ['./physdetail.page.scss'],
})
export class PhysdetailPage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/physical')
  }

}
