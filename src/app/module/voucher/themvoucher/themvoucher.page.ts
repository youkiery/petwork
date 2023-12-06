import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-themvoucher',
  templateUrl: './themvoucher.page.html',
  styleUrls: ['./themvoucher.page.scss'],
})
export class ThemvoucherPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/voucher')
  }

  public async capnhat() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('voucher', 'capnhatvoucher', this.rest.temp).then(resp => {
      this.rest.defreeze()
      this.rest.voucher.danhsach = resp.danhsach
      this.rest.back()
    }, () => {
      this.rest.defreeze()
    })
  }
}
