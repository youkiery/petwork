import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-luongcapnhatnhanvien',
  templateUrl: './luongcapnhatnhanvien.page.html',
  styleUrls: ['./luongcapnhatnhanvien.page.scss'],
})
export class LuongcapnhatnhanvienPage {

  constructor(
    public rest: RestService,
  ) { }


  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/luong')
  }
 
  public nhaptien(loai: string) {
    let tam = Number(this.rest.temp[loai].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp[loai] = this.rest.comma(tam)
  }

  public async capnhat() {
    await this.rest.freeze()
    this.rest.checkpost('luong', 'capnhatnhanvien', this.rest.temp).then((phanhoi) => {
      this.rest.defreeze()
      this.rest.luong.dulieu = phanhoi.dulieu
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
