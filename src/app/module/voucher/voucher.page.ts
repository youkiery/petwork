import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.page.html',
  styleUrls: ['./voucher.page.scss'],
})
export class VoucherPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }
  
  public async ionViewWillEnter() {
    this.rest.ready().then(() => {
      this.rest.action = 'voucher'
      if (!this.rest.voucher.khoitao) this.khoitao()
    })
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('voucher', 'khoitao', {
    }).then(resp => {
      this.rest.defreeze()
      this.rest.voucher.khoitao = true
      this.rest.voucher.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('voucher', 'khoitao', {
    }).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.rest.voucher.khoitao = true
      this.rest.voucher.danhsach = resp.danhsach
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

  public themvoucher() {
    this.rest.temp = {
      id: 0,
      ten: "",
      hansudung: "1",
    }
    this.rest.navCtrl.navigateForward("/voucher/them")
  }
}
