import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisimages',
  templateUrl: './hisimages.page.html',
  styleUrls: ['./hisimages.page.scss'],
})
export class HisimagesPage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/his')
  }
}
