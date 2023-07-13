import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-manualdetail',
  templateUrl: './manualdetail.page.html',
  styleUrls: ['./manualdetail.page.scss'],
})
export class ManualdetailPage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/manual')
  }

  public async detail(image: string) {
    this.rest.temp = image
    this.rest.navCtrl.navigateForward('/modal/detail')
  }
}
