import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-thongkevoucher',
  templateUrl: './thongkevoucher.page.html',
  styleUrls: ['./thongkevoucher.page.scss'],
})
export class ThongkevoucherPage implements OnInit {
  public dulieu = {
    danhan: { danhsach: [], soluong: 0, morong: false },
    dasudung: { danhsach: [], soluong: 0, morong: false },
  }
  public thoigian = {
    batdau: "",
    ketthuc: ""
  }
  constructor(
    public rest: RestService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateBack('/voucher')
    else {
      this.thoigian = {
        batdau: this.rest.home.month.start,
        ketthuc: this.rest.home.month.end,
      }
      this.khoitao()
    }
  }

  public async khoitao() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('voucher', 'khoitaothongke', this.thoigian).then(resp => {
      this.rest.defreeze()
      this.dulieu = resp.dulieu
    }, () => {
      this.rest.defreeze()
    })
  }

  public async tailai(event: any) {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('voucher', 'khoitaothongke', this.thoigian).then(resp => {
      this.rest.defreeze()
      event.target.complete();
      this.dulieu = resp.dulieu
    }, () => {
      this.rest.defreeze()
      event.target.complete();
    })
  }

}
