import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-hisresult',
  templateUrl: './hisresult.page.html',
  styleUrls: ['./hisresult.page.scss'],
})
export class HisresultPage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/his')
    // else if (!this.init) this.auto()
  }
}
