import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-luongthemnhanvien2',
  templateUrl: './luongthemnhanvien2.page.html',
  styleUrls: ['./luongthemnhanvien2.page.scss'],
})
export class Luongthemnhanvien2Page {

  constructor(
    public rest: RestService,
    public time: TimeService
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/luong')
  }

  ionViewWillLeave() {
    this.rest.temp.id = 0
  }
  
  public nhaptien(loai: string) {
    let tam = Number(this.rest.temp[loai].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp[loai] = this.rest.comma(tam)
  }

  public async them() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'themnhanvien2', this.rest.temp).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.temp = {
        id: 0,
        luongcoban: 0,
        hopdong: this.time.datetoisodate(this.rest.home.today),
        camket: this.time.datetoisodate(this.rest.home.today),
        cophan: 0,
        tile: 0,
        phucap: 0,
        phucap2: 0,
      }
      this.rest.luong.nhanvien = phanhoi.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
