import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-luongnhaptay',
  templateUrl: './luongnhaptay.page.html',
  styleUrls: ['./luongnhaptay.page.scss'],
})
export class LuongnhaptayPage {

  constructor(
    public rest: RestService,
    public time: TimeService,
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/luong')
  }

  ionViewWillLeave() {
    this.rest.temp.id = 0
  }
  
  public nhaptien(index: number, loai: string) {
    let tam = Number(this.rest.temp.danhsach[index][loai].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp.danhsach[index][loai] = this.rest.comma(tam)
  }

  public async them() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'themtay', this.rest.temp).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.danhsach = phanhoi.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
