import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-luonglenluong',
  templateUrl: './luonglenluong.page.html',
  styleUrls: ['./luonglenluong.page.scss'],
})
export class LuonglenluongPage {

  constructor(
    public rest: RestService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/luong')
  }

  public async lenluong() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'lenluong', this.rest.temp).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.nhanvien = phanhoi.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
