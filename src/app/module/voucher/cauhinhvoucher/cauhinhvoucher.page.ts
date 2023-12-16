import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-cauhinhvoucher',
  templateUrl: './cauhinhvoucher.page.html',
  styleUrls: ['./cauhinhvoucher.page.scss'],
})
export class CauhinhvoucherPage implements OnInit {
  public cauhinh = {
    voucher: false,
    admin: false,
    quanly: false,
    nhanvien: false
  }
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/voucher')
    else this.khoitao()
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('voucher', 'khoitaocauhinh', {}).then(resp => {
      this.rest.defreeze()
      this.cauhinh = resp.cauhinh
    }, () => {
      this.rest.defreeze()
    })
  }

  public async capnhat() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('voucher', 'capnhatcauhinh', this.cauhinh).then(resp => {
      this.rest.defreeze()
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
