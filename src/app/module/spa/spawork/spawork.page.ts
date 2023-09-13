import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-spawork',
  templateUrl: './spawork.page.html',
  styleUrls: ['./spawork.page.scss'],
})
export class SpaworkPage {
  public list = []
  constructor(
    public rest: RestService,
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/spa') 
    else this.init()  
  }

  public async init( ) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('spa', 'congviec', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
