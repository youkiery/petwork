import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-excelsualoinhuan',
  templateUrl: './excelsualoinhuan.page.html',
  styleUrls: ['./excelsualoinhuan.page.scss'],
})
export class ExcelsualoinhuanPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/excel')
  }

  public nhaptien(bien: string) {
    let tam = Number(this.rest.temp[bien].toString().replace(/[^0-9]/g, '')).toString()
    if (!tam.length) tam = '0'
    this.rest.temp[bien] = this.rest.comma(tam)
  }
  
  public async capnhat() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('loinhuan', 'capnhatnhanvien', {
      userid: this.rest.temp.userid,
      lenluong: this.rest.temp.lenluong,
      luongcoban: this.rest.temp.luongcoban,
    }).then(resp => {
      this.rest.defreeze()
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
