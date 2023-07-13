import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-profdetail',
  templateUrl: './profdetail.page.html',
  styleUrls: ['./profdetail.page.scss'],
})
export class ProfdetailPage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/profile')
  }

}
