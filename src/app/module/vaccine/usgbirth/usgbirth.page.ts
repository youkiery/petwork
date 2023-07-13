import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-usgbirth',
  templateUrl: './usgbirth.page.html',
  styleUrls: ['./usgbirth.page.scss'],
})
export class UsgbirthPage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/vaccine')
  }

  public async save() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('usg', 'birth', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.usg.list = resp.list
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
